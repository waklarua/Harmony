'use server'

import { db } from '@/lib/db'
import { booking, message, user } from '@/lib/db/schema'
import { eq, or, and, desc, inArray, asc } from 'drizzle-orm'
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

  // Group by the other user — one conversation per contact
  const convoMap = new Map<string, {
    latestBookingId: string
    latestTs: Date
    messages: Array<unknown>
    unread: number
  }>()

  for (const bk of bookings) {
    const otherUserId = bk.seekerId === userId ? bk.counselorId : bk.seekerId
    const existing = convoMap.get(otherUserId)
    const msgList = allMessages.filter((m) => m.bookingId === bk.id)
    const latestMsg = msgList[0]
    const ts = latestMsg?.createdAt ?? bk.updatedAt ?? bk.createdAt

    if (!existing) {
      convoMap.set(otherUserId, {
        latestBookingId: bk.id,
        latestTs: ts ?? new Date(0),
        messages: msgList,
        unread: msgList.filter((m) => m.senderId !== userId && !m.isRead).length,
      })
    } else if (ts && ts > existing.latestTs) {
      existing.latestBookingId = bk.id
      existing.latestTs = ts
      existing.unread += msgList.filter((m) => m.senderId !== userId && !m.isRead).length
    } else {
      existing.unread += msgList.filter((m) => m.senderId !== userId && !m.isRead).length
    }
  }

  return Array.from(convoMap.entries()).map(([otherUserId, convo]) => {
    const otherUser = userMap.get(otherUserId)
    const lastMsg = convo.messages[0] as { iv?: string; content: string } | undefined
    const latestTs = convo.latestTs ?? new Date()
    const diff = Date.now() - new Date(latestTs).getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(hours / 24)
    const timestamp =
      hours < 1 ? 'Just now' : hours < 24 ? `${hours}h ago` : `${days}d ago`

    const lastMessage = lastMsg?.iv
      ? decrypt(lastMsg.content, lastMsg.iv, convo.latestBookingId)
      : (lastMsg?.content || 'No messages yet')

    return {
      id: convo.latestBookingId,
      otherName: otherUser?.name || 'Unknown',
      otherAvatar: otherUser?.image || '',
      lastMessage,
      timestamp,
      unread: convo.unread,
      status: 'active' as const,
    }
  })
}

export async function getAllMessagesBetween(otherUserId: string) {
  const userId = await getUserId()

  const sharedBookings = await db
    .select({ id: booking.id })
    .from(booking)
    .where(
      or(
        and(eq(booking.seekerId, userId), eq(booking.counselorId, otherUserId)),
        and(eq(booking.seekerId, otherUserId), eq(booking.counselorId, userId)),
      ),
    )

  if (sharedBookings.length === 0) return { messages: [], otherUser: null }

  const bookingIds = sharedBookings.map((b) => b.id)

  const [otherUserRow] = await db
    .select()
    .from(user)
    .where(eq(user.id, otherUserId))
    .limit(1)

  const [currentUserRow] = await db
    .select({ id: user.id, name: user.name, image: user.image })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)

  const dbMessages = await db
    .select()
    .from(message)
    .where(inArray(message.bookingId, bookingIds))
    .orderBy(asc(message.createdAt))

  const messages = dbMessages.map((m) => {
    const decrypted = m.iv ? decrypt(m.content, m.iv, m.bookingId) : m.content
    return {
      id: m.id,
      senderId: m.senderId,
      senderName: m.senderId === userId ? 'You' : (otherUserRow?.name || 'User'),
      senderAvatar:
        m.senderId === userId
          ? currentUserRow?.image || undefined
          : otherUserRow?.image || undefined,
      content: decrypted,
      timestamp: m.createdAt
        ? new Date(m.createdAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'Africa/Addis_Ababa',
          }) + ' EAT'
        : '',
      isOwn: m.senderId === userId,
    }
  })

  return {
    messages,
    otherUser: otherUserRow ? { name: otherUserRow.name || 'Unknown', image: otherUserRow.image } : null,
    currentUser: currentUserRow || null,
  }
}

export async function markConversationAsRead(otherUserId: string) {
  const userId = await getUserId()

  const sharedBookings = await db
    .select({ id: booking.id })
    .from(booking)
    .where(
      or(
        and(eq(booking.seekerId, userId), eq(booking.counselorId, otherUserId)),
        and(eq(booking.seekerId, otherUserId), eq(booking.counselorId, userId)),
      ),
    )

  if (sharedBookings.length === 0) return

  const bookingIds = sharedBookings.map((b) => b.id)

  await db
    .update(message)
    .set({ isRead: true })
    .where(
      and(
        inArray(message.bookingId, bookingIds),
        eq(message.senderId, otherUserId),
        eq(message.isRead, false),
      ),
    )
}
