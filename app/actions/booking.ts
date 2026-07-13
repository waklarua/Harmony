'use server'

import { db } from '@/lib/db'
import { booking, message, user, scheduleSlot } from '@/lib/db/schema'
import { eq, and, asc, desc, or, sql, ne } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'
import { encrypt, decrypt, deriveKeyBase64 } from '@/lib/encryption'
import { pusher } from '@/lib/pusher'
import { createNotification } from './notifications'
import { sendEmail } from '@/lib/email'
import { addEarning } from './earnings'
import { notifyNextInLine } from './waitlist'
import { createVideoRoom } from './video'
import { verifyPayment } from '@/lib/verify-payment'

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function getDayOfWeek(dateStr: string): number {
  const d = new Date(dateStr + 'T12:00:00Z')
  return d.getUTCDay()
}

export async function createBooking(data: {
  counselorId: string
  sessionType: string
  scheduledAt: string
  duration?: number
  notes?: string
  amount?: number
  paymentStatus?: string
  paymentReference?: string
  paymentMethod?: string
}) {
  const seekerId = await getUserId()

  const scheduledDate = data.scheduledAt.split('T')[0]
  const scheduledTime = data.scheduledAt.split('T')[1]?.slice(0, 5)
  if (!scheduledTime) throw new Error('Invalid scheduledAt format')

  const dayOfWeek = getDayOfWeek(scheduledDate)
  const tsMinutes = timeToMinutes(scheduledTime)
  const eatMinutes = (tsMinutes + 180) % 1440

  const slots = await db
    .select()
    .from(scheduleSlot)
    .where(and(eq(scheduleSlot.counselorId, data.counselorId), eq(scheduleSlot.dayOfWeek, dayOfWeek)))

  const isInSlot = slots.some((s) => {
    const start = timeToMinutes(s.startTime)
    const end = timeToMinutes(s.endTime)
    if (start === end && end === 0) return true
    if (end < start) return eatMinutes >= start || eatMinutes <= end
    return eatMinutes >= start && eatMinutes <= end
  })

  if (!isInSlot) {
    throw new Error('The selected time is outside the counselor\'s available hours')
  }

  const [existing] = await db
    .select({ id: booking.id })
    .from(booking)
    .where(
      and(
        eq(booking.counselorId, data.counselorId),
        sql`DATE(${booking.scheduledAt}) = ${scheduledDate}::date`,
        eq(booking.scheduledAt, new Date(data.scheduledAt)),
        or(eq(booking.status, 'pending'), eq(booking.status, 'confirmed'))
      )
    )
    .limit(1)

  if (existing) {
    throw new Error('This time slot is already booked. Please choose another time.')
  }

  if (data.paymentReference && data.paymentMethod) {
    const ref = data.paymentReference.trim().toUpperCase()

    const [existingRef] = await db
      .select({ id: booking.id })
      .from(booking)
      .where(
        and(
          eq(booking.paymentReference, ref),
          ne(booking.status, 'cancelled'),
        )
      )
      .limit(1)

    if (existingRef) {
      throw new Error('This payment reference has already been used for another booking.')
    }

    const verification = await verifyPayment(
      data.paymentMethod as "telebirr" | "cbe_birr",
      ref,
    )

    if (!verification.verified) {
      throw new Error(verification.error || 'Payment verification failed. Please check your reference number.')
    }

    if (verification.amount && data.amount && verification.amount < data.amount) {
      throw new Error(
        `Payment amount mismatch: expected at least ${data.amount} ETB but receipt shows ${verification.amount} ETB.`,
      )
    }
  }

  // If the slot has already started, shift to current time (full 1 hour from now)
  if (new Date(data.scheduledAt) <= new Date()) {
    data.scheduledAt = new Date().toISOString()
  }

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
      status: 'confirmed',
      paymentStatus: data.paymentStatus || 'pending',
      paymentReference: data.paymentReference || null,
      paymentMethod: data.paymentMethod || null,
    })
    .returning()

  // Auto-confirm — add earnings immediately
  await addEarning(newBooking[0].id)

  const [seeker] = await db
    .select({ name: user.name, email: user.email })
    .from(user)
    .where(eq(user.id, seekerId))
    .limit(1)

  const [counselor] = await db
    .select({ name: user.name, email: user.email })
    .from(user)
    .where(eq(user.id, data.counselorId))
    .limit(1)

  if (seeker?.name) {
    await createNotification(
      data.counselorId,
      `New booking confirmed from ${seeker.name}`,
      'booking'
    )
  }

  if (counselor?.email && seeker?.name) {
    sendEmail({
      to: counselor.email,
      subject: 'New session booked on Harmony',
      text: `Hi ${counselor.name || 'there'},\n\nYou have a new session booked with ${seeker.name}.\n\nLog in to view details and prepare for the session.\n\nBest,\nThe Harmony Team`,
    }).catch(() => {})
  }

  if (seeker?.email && counselor?.name) {
    sendEmail({
      to: seeker.email,
      subject: 'Your Harmony session is confirmed',
      text: `Hi ${seeker.name || 'there'},\n\nYour session with ${counselor.name} has been confirmed.\n\nLog in when it's time to join the video session.\n\nBest,\nThe Harmony Team`,
    }).catch(() => {})
  }

  revalidatePath('/seeker/dashboard')
  revalidatePath('/guide/dashboard')
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
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'missed'
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

  if (status === 'confirmed') {
    const [counselor] = await db
      .select({ name: user.name })
      .from(user)
      .where(eq(user.id, bk[0].counselorId))
      .limit(1)

    if (counselor?.name) {
      await createNotification(
        bk[0].seekerId,
        `Your booking with ${counselor.name} has been confirmed`,
        'booking'
      )
    }

    await addEarning(bookingId)
  }

  if (status === 'cancelled') {
    const [counselor] = await db
      .select({ name: user.name })
      .from(user)
      .where(eq(user.id, bk[0].counselorId))
      .limit(1)

    if (counselor?.name) {
      await notifyNextInLine(bk[0].counselorId, counselor.name)
    }
  }

  revalidatePath('/seeker/dashboard')
  revalidatePath('/guide/dashboard')
  return { success: true }
}

export async function startSession(bookingId: string) {
  const userId = await getUserId()

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk || (bk.seekerId !== userId && bk.counselorId !== userId)) {
    throw new Error('Unauthorized')
  }

  if (bk.status === 'in_progress') {
    return { success: true, alreadyStarted: true }
  }

  if (bk.status !== 'confirmed') {
    throw new Error('Session must be confirmed before starting')
  }

  const now = new Date()
  await db
    .update(booking)
    .set({ status: 'in_progress', startedAt: now, updatedAt: now })
    .where(eq(booking.id, bookingId))

  pusher.trigger(`presence-session-${bookingId}`, 'session-started', {
    startedAt: now.toISOString(),
    startedBy: userId,
  }).catch((err) => console.error('[pusher] trigger failed:', err))

  await createVideoRoom(bookingId).catch((err) => console.error('[video] room creation failed:', err))

  const otherId = bk.seekerId === userId ? bk.counselorId : bk.seekerId
  const callerName = userId === bk.counselorId ? 'Your session' : 'Your session'
  await createNotification(
    otherId,
    `${callerName} has started`,
    'system'
  )

  const [otherUser] = await db
    .select({ name: user.name, email: user.email })
    .from(user)
    .where(eq(user.id, otherId))
    .limit(1)

  if (otherUser?.email) {
    sendEmail({
      to: otherUser.email,
      subject: 'Your Harmony session has started',
      text: `Hi ${otherUser.name || 'there'},\n\nYour session has started. Log in now to join the video call.\n\nBest,\nThe Harmony Team`,
    }).catch(() => {})
  }

  revalidatePath(`/session/${bookingId}`)
  return { success: true }
}

export async function endSession(bookingId: string) {
  const userId = await getUserId()

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk || (bk.seekerId !== userId && bk.counselorId !== userId)) {
    throw new Error('Unauthorized')
  }

  if (bk.status === 'completed' || bk.status === 'cancelled') {
    return { success: true, alreadyEnded: true }
  }

  const now = new Date()
  await db
    .update(booking)
    .set({ status: 'completed', updatedAt: now })
    .where(eq(booking.id, bookingId))

  pusher.trigger(`presence-session-${bookingId}`, 'session-ended', {
    endedAt: now.toISOString(),
    endedBy: userId,
  }).catch((err) => console.error('[pusher] trigger failed:', err))

  const otherId = bk.seekerId === userId ? bk.counselorId : bk.seekerId
  await createNotification(
    otherId,
    'Your session has ended',
    'system'
  )

  revalidatePath(`/session/${bookingId}`)
  revalidatePath('/guide/dashboard')
  revalidatePath('/seeker/dashboard')
  return { success: true }
}

export async function checkMissedSessions() {
  const now = new Date()

  const staleBookings = await db
    .select()
    .from(booking)
    .where(
      and(
        eq(booking.status, 'confirmed'),
        sql`${booking.scheduledAt} + (COALESCE(${booking.duration}, 60) * INTERVAL '1 minute') + INTERVAL '15 minutes' < ${now}`
      )
    )

  for (const bk of staleBookings) {
    await db
      .update(booking)
      .set({ status: 'missed', updatedAt: now })
      .where(eq(booking.id, bk.id))

    await createNotification(
      bk.seekerId,
      'Your session was marked as missed',
      'system'
    )
    await createNotification(
      bk.counselorId,
      'A session was marked as missed',
      'system'
    )
  }

  return { missedCount: staleBookings.length }
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

  const [currentUserRow] = await db
    .select({ id: user.id, name: user.name, image: user.image })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)

  const dbMessages = await db
    .select()
    .from(message)
    .where(eq(message.bookingId, sessionId))
    .orderBy(asc(message.createdAt))

  return {
    booking: bk,
    bookingStatus: bk.status,
    bookingStartedAt: bk.startedAt?.toISOString() || null,
    isCounselor: bk.counselorId === userId,
    otherUserId,
    counselor: otherUser || null,
    currentUser: currentUserRow || null,
    messages: dbMessages.map((m) => {
      const decrypted = m.iv ? decrypt(m.content, m.iv, sessionId) : m.content
      return {
        id: m.id,
        senderId: m.senderId,
        senderName: m.senderId === userId ? 'You' : (otherUser?.name || 'Counselor'),
        senderAvatar:
          m.senderId === userId
            ? currentUserRow?.image || undefined
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
