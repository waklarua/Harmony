'use server'

import { db } from '@/lib/db'
import { user, booking, counselorProfile, review, supportTicket, earnings, emergencyContact } from '@/lib/db/schema'
import { eq, and, or, count, avg, sum, gte, sql, desc, lte } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createNotification } from './notifications'
import { sendEmail } from '@/lib/email'

const PLATFORM_COMMISSION = 0.20

export interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalCounselors: number
  pendingVerifications: number
  totalSessions: number
  sessionsThisMonth: number
  averageRating: number
  supportTickets: number
  totalRevenue: number
  revenueThisMonth: number
  revenueThisWeek: number
  grossEarnings: number
  grossEarningsThisMonth: number
  grossEarningsThisWeek: number
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

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const [activeUsers] = await db
    .select({ count: count() })
    .from(user)
    .where(gte(user.createdAt, thirtyDaysAgo))

  const [totalEarnings] = await db
    .select({ total: sum(earnings.amount) })
    .from(earnings)

  const [monthEarnings] = await db
    .select({ total: sum(earnings.amount) })
    .from(earnings)
    .where(gte(earnings.createdAt, firstOfMonth))

  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const [weekEarnings] = await db
    .select({ total: sum(earnings.amount) })
    .from(earnings)
    .where(gte(earnings.createdAt, weekStart))

  return {
    totalUsers: Number(totalUsers.count),
    activeUsers: Number(activeUsers.count),
    totalCounselors: Number(totalCounselors.count),
    pendingVerifications: Number(pendingVerifications.count),
    totalSessions: Number(totalSessions.count),
    sessionsThisMonth: Number(sessionsThisMonth.count),
    averageRating: Math.round(Number(avgRating.avg || 0) * 10) / 10,
    supportTickets: Number(openTickets.count),
    totalRevenue: Math.round(Number(totalEarnings.total || 0) * PLATFORM_COMMISSION),
    revenueThisMonth: Math.round(Number(monthEarnings.total || 0) * PLATFORM_COMMISSION),
    revenueThisWeek: Math.round(Number(weekEarnings.total || 0) * PLATFORM_COMMISSION),
    grossEarnings: Number(totalEarnings.total || 0),
    grossEarningsThisMonth: Number(monthEarnings.total || 0),
    grossEarningsThisWeek: Number(weekEarnings.total || 0),
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
  const [counselorUser] = await db
    .select({ name: user.name, email: user.email })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)

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

  if (counselorUser?.email) {
    sendEmail({
      to: counselorUser.email,
      subject: 'Your Harmony counselor account is approved!',
      text: `Hi ${counselorUser.name || 'there'},\n\nYour counselor account has been approved! You can now start accepting clients on Harmony.\n\nLog in to set your availability and start booking sessions.\n\nBest,\nThe Harmony Team`,
    }).catch(() => {})
  }

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

export interface UserData {
  id: string
  name: string
  email: string
  avatar: string | null
  role: string
  status: string
  joined: string
  sessions: number
  banned: boolean
}

export async function getWeeklySessionTrend(): Promise<{ week: string; sessions: number }[]> {
  const fourWeeksAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)

  const result = await db.execute(
    sql`SELECT date_trunc('week', "createdAt") as ws, COUNT(*)::int as sessions FROM booking WHERE "createdAt" >= ${fourWeeksAgo} GROUP BY ws ORDER BY ws ASC`
  )

  return (result.rows as Array<{ ws: Date; sessions: number }>).map((r, i) => ({
    week: `W${i + 1}`,
    sessions: r.sessions,
  }))
}

export async function getAllUsers(): Promise<UserData[]> {
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.image,
      role: user.role,
      banned: user.banned,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt))

  const usersWithSessions: UserData[] = []
  for (const u of users) {
    const [sessionCount] = await db
      .select({ count: count() })
      .from(booking)
      .where(
        or(
          eq(booking.seekerId, u.id),
          eq(booking.counselorId, u.id)
        )
      )

    const daysSinceJoin = u.createdAt
      ? Math.floor((Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      : 0

    usersWithSessions.push({
      id: u.id,
      name: u.name || 'Unknown',
      email: u.email || '',
      avatar: u.avatar,
      role: u.role || 'seeker',
      status: daysSinceJoin < 30 ? 'active' : 'inactive',
      joined: u.createdAt
        ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'N/A',
      sessions: Number(sessionCount.count),
      banned: u.banned || false,
    })
  }

  return usersWithSessions
}

export interface AdminUserProfile {
  id: string
  name: string
  email: string
  avatar: string | null
  role: string
  status: string
  joined: string
  sessionsCompleted: number
  counselorProfile: {
    bio: string | null
    specializations: string[]
    yearsOfExperience: number | null
    licenseNumber: string | null
    hourlyRate: string | null
    rating: number | null
    reviewCount: number
    totalEarnings: number
    earningsThisMonth: number
  } | null
  emergencyContacts: {
    id: string
    name: string
    relationship: string | null
    phone: string
    email: string | null
  }[]
}

export async function getUserAdminProfile(userId: string): Promise<AdminUserProfile> {
  const [userRow] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1)

  if (!userRow) throw new Error('User not found')

  const [completedSessions] = await db
    .select({ count: count() })
    .from(booking)
    .where(
      and(
        or(eq(booking.seekerId, userId), eq(booking.counselorId, userId)),
        eq(booking.status, 'completed'),
      ),
    )

  const daysSinceJoin = userRow.createdAt
    ? Math.floor((Date.now() - new Date(userRow.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  const profile: AdminUserProfile = {
    id: userRow.id,
    name: userRow.name || 'Unknown',
    email: userRow.email || '',
    avatar: userRow.image,
    role: userRow.role || 'seeker',
    status: daysSinceJoin < 30 ? 'active' : 'inactive',
    joined: userRow.createdAt
      ? new Date(userRow.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'N/A',
    sessionsCompleted: Number(completedSessions.count),
    counselorProfile: null,
    emergencyContacts: [],
  }

  if (profile.role === 'guide') {
    const [cp] = await db
      .select()
      .from(counselorProfile)
      .where(eq(counselorProfile.userId, userId))
      .limit(1)

    if (cp) {
      const [avgRating] = await db
        .select({ avg: avg(review.rating) })
        .from(review)
        .where(eq(review.counselorId, userId))

      const [totalEarnings] = await db
        .select({ total: sum(earnings.amount) })
        .from(earnings)
        .where(eq(earnings.counselorId, userId))

      const monthStart = new Date()
      monthStart.setDate(1)
      monthStart.setHours(0, 0, 0, 0)
      const [monthEarnings] = await db
        .select({ total: sum(earnings.amount) })
        .from(earnings)
        .where(and(eq(earnings.counselorId, userId), gte(earnings.createdAt, monthStart)))

      profile.counselorProfile = {
        bio: cp.bio,
        specializations: cp.specializations || [],
        yearsOfExperience: cp.yearsOfExperience,
        licenseNumber: cp.licenseNumber,
        hourlyRate: cp.hourlyRate,
        rating: avgRating?.avg ? Math.round(Number(avgRating.avg) * 10) / 10 : null,
        reviewCount: 0,
        totalEarnings: Math.round(Number(totalEarnings?.total || 0) * (1 - PLATFORM_COMMISSION)),
        earningsThisMonth: Math.round(Number(monthEarnings?.total || 0) * (1 - PLATFORM_COMMISSION)),
      }
    }
  }

  if (profile.role === 'seeker') {
    const contacts = await db
      .select()
      .from(emergencyContact)
      .where(eq(emergencyContact.userId, userId))
      .orderBy(desc(emergencyContact.createdAt))

    profile.emergencyContacts = contacts.map((c) => ({
      id: c.id,
      name: c.name,
      relationship: c.relationship,
      phone: c.phone,
      email: c.email,
    }))
  }

  return profile
}

export async function suspendUser(userId: string) {
  await db.update(user).set({ banned: true }).where(eq(user.id, userId))
  await createNotification(userId, 'Your account has been suspended by an administrator.', 'system')
  revalidatePath('/steward/users')
  return { success: true }
}

export async function unsuspendUser(userId: string) {
  await db.update(user).set({ banned: false }).where(eq(user.id, userId))
  await createNotification(userId, 'Your account has been unsuspended.', 'system')
  revalidatePath('/steward/users')
  return { success: true }
}
