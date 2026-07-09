'use server'

import { db } from '@/lib/db'
import { earnings, booking, user } from '@/lib/db/schema'
import { eq, and, sql, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

const PLATFORM_COMMISSION = 0.20

export async function addEarning(bookingId: string) {
  const [bk] = await db
    .select({ counselorId: booking.counselorId, amount: booking.amount })
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk) throw new Error('Booking not found')

  const sessionAmount = Number(bk.amount) || 1500

  await db.insert(earnings).values({
    id: crypto.randomUUID(),
    counselorId: bk.counselorId,
    bookingId,
    amount: sessionAmount,
  })
}

export async function getCounselorEarnings(counselorId: string) {
  const rows = await db
    .select()
    .from(earnings)
    .where(eq(earnings.counselorId, counselorId))
    .orderBy(desc(earnings.createdAt))

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const monthRows = rows.filter((r) => r.createdAt && r.createdAt >= monthStart)
  const rawTotal = rows.reduce((sum, r) => sum + r.amount, 0)
  const rawMonth = monthRows.reduce((sum, r) => sum + r.amount, 0)

  return {
    total: Math.round(rawTotal * (1 - PLATFORM_COMMISSION)),
    thisMonth: Math.round(rawMonth * (1 - PLATFORM_COMMISSION)),
    entries: rows.map((r) => ({
      id: r.id,
      bookingId: r.bookingId,
      amount: Math.round(r.amount * (1 - PLATFORM_COMMISSION)),
      createdAt: r.createdAt?.toISOString() || '',
    })),
  }
}

export async function getMyEarnings() {
  const userId = await getUserId()
  return getCounselorEarnings(userId)
}
