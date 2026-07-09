'use server'

import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { decrypt } from '@/lib/encryption'

export interface HistoryBookingNote {
  content: string
  createdAt: Date | null
  updatedAt: Date | null
}

export interface HistoryBooking {
  id: string
  scheduledAt: string
  status: string
  duration: number | null
  sessionType: string
  note: HistoryBookingNote | null
}

export interface HistoryClient {
  seekerId: string
  name: string
  avatar: string | null
  totalSessions: number
  bookings: HistoryBooking[]
}

export async function getGuideClientHistory(): Promise<HistoryClient[]> {
  const userId = await getUserId()

  const rawBookings = await db.query.booking.findMany({
    where: eq(booking.counselorId, userId),
    with: {
      seeker: { columns: { name: true, image: true } },
      sessionNote: {
        columns: { encryptedContent: true, iv: true, createdAt: true, updatedAt: true },
      },
    },
    orderBy: [desc(booking.scheduledAt)],
  })

  const clientMap = new Map<string, HistoryClient>()

  for (const b of rawBookings) {
    const sid = b.seekerId
    let note: HistoryBookingNote | null = null
    if (b.sessionNote) {
      try {
        const decrypted = decrypt(b.sessionNote.encryptedContent, b.sessionNote.iv, b.id)
        note = {
          content: decrypted,
          createdAt: b.sessionNote.createdAt,
          updatedAt: b.sessionNote.updatedAt,
        }
      } catch {
        // decryption failed — include booking without note
      }
    }

    const bookingEntry: HistoryBooking = {
      id: b.id,
      scheduledAt: b.scheduledAt.toISOString(),
      status: b.status || 'unknown',
      duration: b.duration,
      sessionType: b.sessionType,
      note,
    }

    const existing = clientMap.get(sid)
    if (existing) {
      existing.totalSessions++
      existing.bookings.push(bookingEntry)
    } else {
      clientMap.set(sid, {
        seekerId: sid,
        name: b.seeker.name || 'Unknown',
        avatar: b.seeker.image,
        totalSessions: 1,
        bookings: [bookingEntry],
      })
    }
  }

  return Array.from(clientMap.values())
}
