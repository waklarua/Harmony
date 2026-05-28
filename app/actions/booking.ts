'use server'

import { db } from '@/lib/db'
import { booking, message } from '@/lib/db/schema'
import { eq, and, desc, or } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

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

  const newMessage = await db
    .insert(message)
    .values({
      id: `msg_${Date.now()}`,
      bookingId,
      senderId,
      content,
      isRead: false,
    })
    .returning()

  revalidatePath(`/session/${bookingId}`)
  return newMessage[0]
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

  return messages
}
