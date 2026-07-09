'use server'

import { db } from '@/lib/db'
import { emergencyContact, therapyGoal, booking } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'

async function verifyActiveBooking(seekerUserId: string) {
  const userId = await getUserId()

  const [activeBooking] = await db
    .select()
    .from(booking)
    .where(
      and(
        eq(booking.counselorId, userId),
        eq(booking.seekerId, seekerUserId),
        eq(booking.status, 'in_progress'),
      ),
    )
    .limit(1)

  if (!activeBooking) {
    throw new Error('Unauthorized')
  }

  return userId
}

export async function getSeekerEmergencyContacts(seekerUserId: string) {
  await verifyActiveBooking(seekerUserId)

  const contacts = await db
    .select()
    .from(emergencyContact)
    .where(eq(emergencyContact.userId, seekerUserId))
    .orderBy(desc(emergencyContact.createdAt))

  return contacts.map((c) => ({
    id: c.id,
    name: c.name,
    relationship: c.relationship,
    phone: c.phone,
    email: c.email,
  }))
}

export async function getSeekerTherapyGoals(seekerUserId: string) {
  await verifyActiveBooking(seekerUserId)

  const goals = await db
    .select()
    .from(therapyGoal)
    .where(eq(therapyGoal.userId, seekerUserId))
    .orderBy(desc(therapyGoal.createdAt))

  return goals.map((g) => ({
    id: g.id,
    goal: g.goal,
    status: g.status || 'active',
    targetDate: g.targetDate?.toISOString().split('T')[0] || null,
  }))
}
