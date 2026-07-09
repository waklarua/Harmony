'use server'

import { db } from '@/lib/db'
import { scheduleSlot, booking, waitlistEntry, user } from '@/lib/db/schema'
import { eq, and, gte, lte, or, sql } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { notifyNextInLine } from './waitlist'

export interface AvailabilitySlot {
  dayOfWeek: number
  startTime: string
  endTime: string
}

export async function getMyAvailability(): Promise<AvailabilitySlot[]> {
  const userId = await getUserId()
  return getCounselorAvailability(userId)
}

export async function getCounselorAvailability(counselorId: string): Promise<AvailabilitySlot[]> {
  const slots = await db
    .select()
    .from(scheduleSlot)
    .where(eq(scheduleSlot.counselorId, counselorId))
    .orderBy(scheduleSlot.dayOfWeek, scheduleSlot.startTime)

  return slots.map((s) => ({
    dayOfWeek: s.dayOfWeek,
    startTime: s.startTime,
    endTime: s.endTime,
  }))
}

export async function saveCounselorAvailability(slots: AvailabilitySlot[]) {
  const userId = await getUserId()

  await db.delete(scheduleSlot).where(eq(scheduleSlot.counselorId, userId))

  if (slots.length === 0) return { success: true }

  await db.insert(scheduleSlot).values(
    slots.map((s) => ({
      id: `sl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      counselorId: userId,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
    }))
  )

  const [waiting] = await db
    .select({ id: waitlistEntry.id })
    .from(waitlistEntry)
    .where(eq(waitlistEntry.counselorId, userId))
    .limit(1)

  if (waiting) {
    const [counselorUser] = await db
      .select({ name: user.name })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1)

    if (counselorUser?.name) {
      await notifyNextInLine(userId, counselorUser.name)
    }
  }

  return { success: true }
}

function getDayOfWeek(dateStr: string): number {
  const d = new Date(dateStr + 'T12:00:00Z')
  return d.getUTCDay()
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export async function getAvailableTimeSlots(counselorId: string, dateStr: string) {
  const dayOfWeek = getDayOfWeek(dateStr)
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const slots = await db
    .select()
    .from(scheduleSlot)
    .where(and(eq(scheduleSlot.counselorId, counselorId), eq(scheduleSlot.dayOfWeek, dayOfWeek)))
    .orderBy(scheduleSlot.startTime)

  if (slots.length === 0) return []

  const existingBookings = await db
    .select({ scheduledAt: booking.scheduledAt, duration: booking.duration })
    .from(booking)
    .where(
      and(
        eq(booking.counselorId, counselorId),
        sql`DATE(${booking.scheduledAt}) = ${dateStr}::date`,
        or(eq(booking.status, 'pending'), eq(booking.status, 'confirmed'))
      )
    )

  const bookedMinutes = new Set<number>()
  for (const b of existingBookings) {
    if (!b.scheduledAt) continue
    const startH = b.scheduledAt.getUTCHours()
    const startM = b.scheduledAt.getUTCMinutes()
    const mins = (startH * 60 + startM + 180) % 1440
    bookedMinutes.add(mins)
  }

  // Generate hourly time slots from the counselor's availability range
  const allSlots: { label: string; value: string }[] = []
  for (const s of slots) {
    const start = timeToMinutes(s.startTime)
    const end = timeToMinutes(s.endTime)
    const minutes: number[] = []
    if (start === end && end === 0) {
      for (let m = 0; m < 1440; m += 60) minutes.push(m)
    } else if (end < start) {
      for (let m = start; m < 1440; m += 60) minutes.push(m)
      for (let m = 0; m <= end; m += 60) minutes.push(m)
    } else {
      for (let m = start; m <= end; m += 60) minutes.push(m)
    }
    for (const m of minutes) {
      const hours = Math.floor(m / 60)
      const mins = m % 60
      const value = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
      allSlots.push({ label: value, value })
    }
  }

  let availableSlots = allSlots.filter((ts) => {
    const tsMinutes = timeToMinutes(ts.value)
    if (bookedMinutes.has(tsMinutes)) return false
    return true
  })

  // Keep slots that haven't ended yet (allow booking in-progress slots)
  const todayUtc = new Date().toISOString().split('T')[0]
  if (dateStr === todayUtc) {
    const now = new Date()
    const eatMinutes = (now.getUTCHours() * 60 + now.getUTCMinutes() + 180) % 1440
    const SESSION_DURATION = 60
    availableSlots = availableSlots.filter((ts) => {
      const startMin = timeToMinutes(ts.value)
      return startMin + SESSION_DURATION > eatMinutes
    })
  }

  return availableSlots
}
