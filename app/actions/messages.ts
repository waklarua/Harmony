'use server'

import { db } from '@/lib/db'
import { booking, message, user } from '@/lib/db/schema'
import { eq, or, desc, inArray } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { decrypt } from '@/lib/encryption'

export async function getConversations() {
  const userId = await getUserId()

  const bookings = await db
    .select()
    .from(booking)
    .where(or(eq(booking.seekerId, userId), eq(booking.counselorId, userId)))
    .orderBy(desc(booking.updatedAt))

  if (bookings.length === 0) return []

  const bookingIds = bookings.map((b) => b.id)

  const allMessages = await db
    .select()
    .from(message)
    .where(inArray(message.bookingId, bookingIds))
    .orderBy(desc(message.createdAt))

  const otherUserIds = [
    ...new Set(bookings.map((b) => (b.seekerId === userId ? b.counselorId : b.seekerId))),
  ]

  const users = await db.select().from(user).where(inArray(user.id, otherUserIds))

  const userMap = new Map(users.map((u) => [u.id, u]))

  return bookings.map((bk) => {
    const otherUserId = bk.seekerId === userId ? bk.counselorId : bk.seekerId
    const otherUser = userMap.get(otherUserId)
    const msgList = allMessages.filter((m) => m.bookingId === bk.id)
    const lastMsg = msgList[0]
    const unread = msgList.filter((m) => m.senderId !== userId && !m.isRead).length

    const ts = lastMsg?.createdAt ?? bk.createdAt
    const diff = Date.now() - new Date(ts ?? Date.now()).getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(hours / 24)
    const timestamp =
      hours < 1 ? 'Just now' : hours < 24 ? `${hours}h ago` : `${days}d ago`

    return {
      id: bk.id,
      otherName: otherUser?.name || 'Unknown',
      otherAvatar: otherUser?.image || '',
      lastMessage: lastMsg?.iv ? decrypt(lastMsg.content, lastMsg.iv, bk.id) : (lastMsg?.content || 'No messages yet'),
      timestamp,
      unread,
      status: 'active' as const,
    }
  })
}
