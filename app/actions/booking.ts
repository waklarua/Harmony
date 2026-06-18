'use server'

import { db } from '@/lib/db'
import { booking, message, user } from '@/lib/db/schema'
import { eq, and, asc, desc, or } from 'drizzle-orm'
import { getUserId, getSession } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'
import { encrypt, decrypt, deriveKeyBase64 } from '@/lib/encryption'
import { pusher } from '@/lib/pusher'

export async function createBooking(data: {
  counselorId: string
  sessionType: string
  scheduledAt: string
  duration?: number
  notes?: string
  amount?: number
}) {
  const seekerId = await getUserId()

  const newBooking = await db
    .insert(booking)
    .values({
      id: `bk_${Date.now()}`,
      seekerId,
      counselorId: data.counselorId,
      sessionType: data.sessionType,
      scheduledAt: new Date(data.scheduledAt),
      duration: data.duration,
      notes: data.notes,
      amount: data.amount?.toString(),
      status: 'pending',
    })
    .returning()

  revalidatePath('/seeker/dashboard')
  return newBooking[0]
}

export async function getBookings() {
  const userId = await getUserId()

  const bookings = await db
    .select()
    .from(booking)
    .where(
      or(eq(booking.seekerId, userId), eq(booking.counselorId, userId))
    )
    .orderBy(desc(booking.createdAt))

  return bookings
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
) {
  const userId = await getUserId()

  // Verify user owns or is counselor for this booking
  const bk = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk[0] || (bk[0].seekerId !== userId && bk[0].counselorId !== userId)) {
    throw new Error('Unauthorized')
  }

  await db.update(booking).set({ status }).where(eq(booking.id, bookingId))

  revalidatePath('/seeker/dashboard')
  revalidatePath('/guide/dashboard')
  return { success: true }
}

export async function sendMessage(bookingId: string, content: string) {
  const senderId = await getUserId()

  // Verify user is part of this booking
  const bk = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk[0] || (bk[0].seekerId !== senderId && bk[0].counselorId !== senderId)) {
    throw new Error('Unauthorized')
  }

  const msgId = `msg_${Date.now()}`
  const { iv, ciphertext } = encrypt(content, bookingId)

  const newMessage = await db
    .insert(message)
    .values({
      id: msgId,
      bookingId,
      senderId,
      content: ciphertext,
      iv,
      isRead: false,
    })
    .returning()

  // Notify other participant via Pusher
  pusher.trigger(`private-session-${bookingId}`, 'new-message', {
    id: msgId,
    senderId,
    content: ciphertext,
    iv,
    createdAt: new Date().toISOString(),
  }).catch((err) => console.error('[pusher] trigger failed:', err))

  revalidatePath(`/session/${bookingId}`)
  return { ...newMessage[0], content }
}

export async function getMessages(bookingId: string) {
  const userId = await getUserId()

  // Verify user is part of this booking
  const bk = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk[0] || (bk[0].seekerId !== userId && bk[0].counselorId !== userId)) {
    throw new Error('Unauthorized')
  }

  const messages = await db
    .select()
    .from(message)
    .where(eq(message.bookingId, bookingId))
    .orderBy(desc(message.createdAt))

  return messages.map((m) => ({
    ...m,
    content: m.iv ? decrypt(m.content, m.iv, bookingId) : m.content,
  }))
}

export async function getSessionData(sessionId: string) {
  const userId = await getUserId()
  const sess = await getSession()

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, sessionId))
    .limit(1)

  if (!bk) throw new Error('Session not found')
  if (bk.seekerId !== userId && bk.counselorId !== userId) {
    throw new Error('Unauthorized')
  }

  const otherUserId = bk.seekerId === userId ? bk.counselorId : bk.seekerId
  const [otherUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, otherUserId))
    .limit(1)

  const dbMessages = await db
    .select()
    .from(message)
    .where(eq(message.bookingId, sessionId))
    .orderBy(asc(message.createdAt))

  const sessionUser = sess?.user

  return {
    booking: bk,
    counselor: otherUser || null,
    currentUser: sessionUser || null,
    messages: dbMessages.map((m) => {
      const decrypted = m.iv ? decrypt(m.content, m.iv, sessionId) : m.content
      return {
        id: m.id,
        senderId: m.senderId,
        senderName: m.senderId === userId ? 'You' : (otherUser?.name || 'Counselor'),
        senderAvatar:
          m.senderId === userId
            ? sessionUser?.image || undefined
            : otherUser?.image || undefined,
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
    }),
  }
}

export async function getSessionEncryptionKey(sessionId: string) {
  const userId = await getUserId()

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, sessionId))
    .limit(1)

  if (!bk || (bk.seekerId !== userId && bk.counselorId !== userId)) {
    throw new Error('Unauthorized')
  }

  return { key: deriveKeyBase64(sessionId) }
}
