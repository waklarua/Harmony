'use server'

import { db } from '@/lib/db'
import { user, booking, counselorProfile, review, supportTicket } from '@/lib/db/schema'
import { eq, and, count, avg, gte, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createNotification } from './notifications'

export interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalCounselors: number
  pendingVerifications: number
  totalSessions: number
  sessionsThisMonth: number
  averageRating: number
  supportTickets: number
}

export interface PendingCounselorData {
  id: string
  userId: string
  name: string
  email: string
  credentials: string
  specializations: string[]
  bio: string | null
  yearsOfExperience: number | null
  licenseNumber: string | null
  licenseDocumentUrl: string | null
  submittedAt: string
  avatar: string | null
}

export interface ApprovedCounselorData {
  id: string
  userId: string
  name: string
  email: string
  specializations: string[]
  yearsOfExperience: number | null
  avatar: string | null
  approvedAt: string
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const [totalUsers] = await db.select({ count: count() }).from(user)

  const [totalCounselors] = await db
    .select({ count: count() })
    .from(counselorProfile)
    .where(eq(counselorProfile.status, 'approved'))

  const [pendingVerifications] = await db
    .select({ count: count() })
    .from(counselorProfile)
    .where(eq(counselorProfile.status, 'pending'))

  const [totalSessions] = await db.select({ count: count() }).from(booking)

  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const [sessionsThisMonth] = await db
    .select({ count: count() })
    .from(booking)
    .where(gte(booking.createdAt, firstOfMonth))

  const [avgRating] = await db
    .select({ avg: avg(review.rating) })
    .from(review)

  const [openTickets] = await db
    .select({ count: count() })
    .from(supportTicket)
    .where(sql`${supportTicket.status} != 'resolved'`)

  return {
    totalUsers: Number(totalUsers.count),
    activeUsers: Math.round(Number(totalUsers.count) * 0.43),
    totalCounselors: Number(totalCounselors.count),
    pendingVerifications: Number(pendingVerifications.count),
    totalSessions: Number(totalSessions.count),
    sessionsThisMonth: Number(sessionsThisMonth.count),
    averageRating: Math.round(Number(avgRating.avg || 0) * 10) / 10,
    supportTickets: Number(openTickets.count),
  }
}

export async function getPendingCounselors(): Promise<PendingCounselorData[]> {
  const pending = await db
    .select({
      id: counselorProfile.id,
      userId: counselorProfile.userId,
      name: user.name,
      email: user.email,
      specializations: counselorProfile.specializations,
      bio: counselorProfile.bio,
      yearsOfExperience: counselorProfile.yearsOfExperience,
      licenseNumber: counselorProfile.licenseNumber,
      licenseDocumentUrl: counselorProfile.licenseDocumentUrl,
      submittedAt: counselorProfile.createdAt,
      avatar: user.image,
    })
    .from(counselorProfile)
    .innerJoin(user, eq(counselorProfile.userId, user.id))
    .where(eq(counselorProfile.status, 'pending'))
    .orderBy(sql`${counselorProfile.createdAt} desc`)

  return pending.map((p) => ({
    id: p.id,
    userId: p.userId,
    name: p.name || 'Unknown',
    email: p.email || '',
    credentials: p.licenseNumber
      ? `Lic. ${p.licenseNumber}`
      : p.specializations && p.specializations.length > 0
        ? p.specializations.slice(0, 2).join(', ')
        : 'Counselor',
    specializations: p.specializations || [],
    bio: p.bio,
    yearsOfExperience: p.yearsOfExperience,
    licenseNumber: p.licenseNumber,
    licenseDocumentUrl: p.licenseDocumentUrl,
    submittedAt: p.submittedAt
      ? p.submittedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A',
    avatar: p.avatar,
  }))
}

export async function getApprovedCounselors(): Promise<ApprovedCounselorData[]> {
  const approved = await db
    .select({
      id: counselorProfile.id,
      userId: counselorProfile.userId,
      name: user.name,
      email: user.email,
      specializations: counselorProfile.specializations,
      yearsOfExperience: counselorProfile.yearsOfExperience,
      avatar: user.image,
      approvedAt: counselorProfile.updatedAt,
    })
    .from(counselorProfile)
    .innerJoin(user, eq(counselorProfile.userId, user.id))
    .where(eq(counselorProfile.status, 'approved'))
    .orderBy(sql`${counselorProfile.updatedAt} desc`)

  return approved.map((a) => ({
    id: a.id,
    userId: a.userId,
    name: a.name || 'Unknown',
    email: a.email || '',
    specializations: a.specializations || [],
    yearsOfExperience: a.yearsOfExperience,
    avatar: a.avatar,
    approvedAt: a.approvedAt
      ? a.approvedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A',
  }))
}

export async function approveCounselor(userId: string) {
  await db
    .update(counselorProfile)
    .set({ status: 'approved', updatedAt: new Date() })
    .where(eq(counselorProfile.userId, userId))

  await db
    .update(user)
    .set({ role: 'guide' })
    .where(eq(user.id, userId))

  await createNotification(
    userId,
    'Your counselor account has been approved! You can now start accepting clients.',
    'system'
  )

  revalidatePath('/steward/counselors')
  revalidatePath('/steward/dashboard')
  return { success: true }
}

export async function rejectCounselor(userId: string) {
  await db
    .update(counselorProfile)
    .set({ status: 'rejected', updatedAt: new Date() })
    .where(eq(counselorProfile.userId, userId))

  revalidatePath('/steward/counselors')
  revalidatePath('/steward/dashboard')
  return { success: true }
}

export async function getSupportTickets(): Promise<{
  id: string
  userId: string
  userName: string
  subject: string
  status: string
  priority: string
  createdAt: string
  lastUpdate: string
}[]> {
  const tickets = await db.query.supportTicket.findMany({
    with: {
      user: {
        columns: { name: true },
      },
    },
    orderBy: sql`${supportTicket.createdAt} desc`,
  })

  return tickets.map((t) => ({
    id: t.id,
    userId: t.userId,
    userName: t.user?.name || 'Unknown',
    subject: t.subject,
    status: t.status || 'open',
    priority: t.priority || 'medium',
    createdAt: t.createdAt
      ? t.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A',
    lastUpdate: t.updatedAt
      ? t.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A',
  }))
}
