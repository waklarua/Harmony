'use server'

import { db } from '@/lib/db'
import { user, counselorProfile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'

export async function createCounselorProfile(
  userId: string,
  data: {
    bio?: string
    specializations?: string[]
    certifications?: string[]
    yearsOfExperience?: number
    licenseNumber?: string
    licenseDocumentUrl?: string
  },
) {
  const result = await db.insert(counselorProfile).values({
    id: `cp_${Date.now()}`,
    userId,
    bio: data.bio,
    specializations: data.specializations,
    certifications: data.certifications,
    yearsOfExperience: data.yearsOfExperience,
    licenseNumber: data.licenseNumber,
    licenseDocumentUrl: data.licenseDocumentUrl,
    status: 'pending',
  })

  return result
}

export async function updateCounselorProfile(data: {
  bio?: string
  specializations?: string[]
  certifications?: string[]
  yearsOfExperience?: number
  licenseNumber?: string
  licenseDocumentUrl?: string
}) {
  const userId = await getUserId()

  const existing = await db
    .select()
    .from(counselorProfile)
    .where(eq(counselorProfile.userId, userId))
    .limit(1)

  if (existing.length === 0) {
    return createCounselorProfile(userId, data)
  }

  await db
    .update(counselorProfile)
    .set({
      bio: data.bio,
      specializations: data.specializations,
      certifications: data.certifications,
      yearsOfExperience: data.yearsOfExperience,
      licenseNumber: data.licenseNumber,
      licenseDocumentUrl: data.licenseDocumentUrl,
    })
    .where(eq(counselorProfile.userId, userId))

  return { success: true }
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

export async function updateUserRole(userId: string, role: 'seeker' | 'guide' | 'steward') {
  await db.update(user).set({ role }).where(eq(user.id, userId))

  return { success: true }
}
