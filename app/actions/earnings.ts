'use server'

import { db } from '@/lib/db'
import { earnings, booking, user } from '@/lib/db/schema'
import { eq, and, sql, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

export async function addEarning(bookingId: string) {
  const [bk] = await db
    .select({ counselorId: booking.counselorId })
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk) throw new Error('Booking not found')

  await db.insert(earnings).values({
    id: crypto.randomUUID(),
    counselorId: bk.counselorId,
    bookingId,
    amount: 1500,
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

  const thisMonth = rows.filter((r) => r.createdAt && r.createdAt >= monthStart)
  const total = rows.reduce((sum, r) => sum + r.amount, 0)
  const thisMonthTotal = thisMonth.reduce((sum, r) => sum + r.amount, 0)

  return {
    total,
    thisMonth: thisMonthTotal,
    entries: rows.map((r) => ({
      id: r.id,
      bookingId: r.bookingId,
      amount: r.amount,
      createdAt: r.createdAt?.toISOString() || '',
    })),
  }
}

export async function getMyEarnings() {
  const userId = await getUserId()
  return getCounselorEarnings(userId)
}
