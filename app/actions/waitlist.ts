'use server'

import { db } from '@/lib/db'
import { waitlistEntry, user } from '@/lib/db/schema'
import { eq, and, asc, sql, count } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'
import { createNotification } from './notifications'

export async function joinWaitlist(counselorId: string) {
  const seekerId = await getUserId()

  if (seekerId === counselorId) {
    throw new Error('Cannot join your own waitlist')
  }

  const [existing] = await db
    .select({ id: waitlistEntry.id })
    .from(waitlistEntry)
    .where(and(eq(waitlistEntry.seekerId, seekerId), eq(waitlistEntry.counselorId, counselorId)))
    .limit(1)

  if (existing) {
    return { onWaitlist: true }
  }

  await db.insert(waitlistEntry).values({
    id: `wl_${Date.now()}`,
    seekerId,
    counselorId,
  })

  revalidatePath(`/seeker/counselors/${counselorId}`)
  return { onWaitlist: true }
}

export async function leaveWaitlist(counselorId: string) {
  const seekerId = await getUserId()

  await db
    .delete(waitlistEntry)
    .where(and(eq(waitlistEntry.seekerId, seekerId), eq(waitlistEntry.counselorId, counselorId)))

  revalidatePath(`/seeker/counselors/${counselorId}`)
  return { onWaitlist: false }
}

export async function getMyWaitlistStatus(counselorId: string) {
  const seekerId = await getUserId()

  const [entry] = await db
    .select({ createdAt: waitlistEntry.createdAt })
    .from(waitlistEntry)
    .where(and(eq(waitlistEntry.seekerId, seekerId), eq(waitlistEntry.counselorId, counselorId)))
    .limit(1)

  if (!entry) {
    return { onWaitlist: false, position: null }
  }

  const [{ count: pos }] = await db
    .select({ count: count() })
    .from(waitlistEntry)
    .where(
      and(
        eq(waitlistEntry.counselorId, counselorId),
        sql`${waitlistEntry.createdAt} < ${entry.createdAt}`
      )
    )

  return { onWaitlist: true, position: Number(pos) + 1 }
}

export async function getWaitlistForCounselor() {
  const counselorId = await getUserId()

  const entries = await db
    .select({
      id: waitlistEntry.id,
      seekerId: waitlistEntry.seekerId,
      seekerName: user.name,
      seekerImage: user.image,
      createdAt: waitlistEntry.createdAt,
    })
    .from(waitlistEntry)
    .leftJoin(user, eq(waitlistEntry.seekerId, user.id))
    .where(eq(waitlistEntry.counselorId, counselorId))
    .orderBy(asc(waitlistEntry.createdAt))

  return entries
}

export async function notifyNextInLine(counselorId: string, counselorName: string) {
  const [entry] = await db
    .select()
    .from(waitlistEntry)
    .where(eq(waitlistEntry.counselorId, counselorId))
    .orderBy(asc(waitlistEntry.createdAt))
    .limit(1)

  if (!entry) return

  await createNotification(
    entry.seekerId,
    `A slot with ${counselorName} just opened up — book now.`,
    'booking'
  )

  await db.delete(waitlistEntry).where(eq(waitlistEntry.id, entry.id))
}
