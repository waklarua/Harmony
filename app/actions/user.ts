'use server'

import { db } from '@/lib/db'
import { user, counselorProfile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'

export async function createCounselorProfile(data: {
  bio?: string
  specializations?: string[]
  certifications?: string[]
  hourlyRate?: number
  availability?: string
}) {
  const userId = await getUserId()

  const result = await db.insert(counselorProfile).values({
    id: `cp_${Date.now()}`,
    userId,
    bio: data.bio,
    specializations: data.specializations,
    certifications: data.certifications,
    hourlyRate: data.hourlyRate?.toString(),
    availability: data.availability,
  })

  return result
}

export async function getCounselorProfile() {
  const userId = await getUserId()

  const profile = await db
    .select()
    .from(counselorProfile)
    .where(eq(counselorProfile.userId, userId))
    .limit(1)

  return profile[0] || null
}

export async function updateUserRole(role: 'seeker' | 'guide' | 'steward') {
  const userId = await getUserId()

  await db.update(user).set({ role }).where(eq(user.id, userId))

  return { success: true }
}
