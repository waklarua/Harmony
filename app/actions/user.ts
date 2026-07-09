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

export async function getFullGuideProfile() {
  const userId = await getUserId()

  const [userRow] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)

  if (!userRow) throw new Error('User not found')

  const profile = await db
    .select()
    .from(counselorProfile)
    .where(eq(counselorProfile.userId, userId))
    .limit(1)

  return {
    id: userRow.id,
    name: userRow.name || '',
    email: userRow.email || '',
    image: userRow.image || '',
    role: userRow.role || '',
    joinedAt: userRow.createdAt?.toISOString() || '',
    bio: profile[0]?.bio || '',
    specializations: profile[0]?.specializations || [],
    certifications: profile[0]?.certifications || [],
    yearsOfExperience: profile[0]?.yearsOfExperience || 0,
    licenseNumber: profile[0]?.licenseNumber || '',
    hourlyRate: profile[0]?.hourlyRate ? Number(profile[0].hourlyRate) : 0,
  }
}

export async function updateGuideProfile(data: {
  name?: string
  image?: string
  bio?: string
  specializations?: string[]
  yearsOfExperience?: number
  hourlyRate?: number
}) {
  const userId = await getUserId()

  if (data.name !== undefined || data.image !== undefined) {
    await db
      .update(user)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.image !== undefined && { image: data.image }),
      })
      .where(eq(user.id, userId))
  }

  const existing = await db
    .select()
    .from(counselorProfile)
    .where(eq(counselorProfile.userId, userId))
    .limit(1)

  const profileUpdate: Record<string, unknown> = {}
  if (data.bio !== undefined) profileUpdate.bio = data.bio
  if (data.specializations !== undefined) profileUpdate.specializations = data.specializations
  if (data.yearsOfExperience !== undefined) profileUpdate.yearsOfExperience = data.yearsOfExperience
  if (data.hourlyRate !== undefined) profileUpdate.hourlyRate = String(data.hourlyRate)

  if (Object.keys(profileUpdate).length > 0) {
    if (existing.length === 0) {
      await db.insert(counselorProfile).values({
        id: `cp_${Date.now()}`,
        userId,
        ...profileUpdate,
        status: 'pending',
      })
    } else {
      await db
        .update(counselorProfile)
        .set(profileUpdate)
        .where(eq(counselorProfile.userId, userId))
    }
  }

  return { success: true }
}

export async function updateUserRole(userId: string, role: 'seeker' | 'guide' | 'steward') {
  await db.update(user).set({ role }).where(eq(user.id, userId))

  return { success: true }
}
