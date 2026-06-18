'use server'

import { db } from '@/lib/db'
import { user, booking, counselorProfile, moodEntry, review, assessmentResult } from '@/lib/db/schema'
import { eq, desc, and, or, ilike } from 'drizzle-orm'

export interface SessionData {
  id: string
  counselorId: string
  counselorName: string
  counselorAvatar: string | null
  counselorSpecialty: string
  date: string
  time: string
  duration: number | null
  status: string
  type: string
  notes: string | null
}

export interface MoodDataPoint {
  date: string
  value: number
  note?: string | null
}

export interface CounselorListItem {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  reviewCount: number
  yearsExperience: number
  hourlyRate: number
  availability: string[]
  bio: string | null
  avatar: string | null
  languages: string[]
  approach: string
  verified: boolean
}

export interface ClientData {
  id: string
  name: string
  avatar: string | null
  lastSession: string
  totalSessions: number
  status: string
}

export interface GuideSessionData {
  id: string
  clientId: string
  clientName: string
  clientAvatar: string | null
  date: string
  time: string
  duration: number | null
  status: string
  type: string
}

function formatEATDate(date: Date): string {
  return date.toLocaleDateString('en-CA', { timeZone: 'Africa/Addis_Ababa' })
}

function formatEATTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Africa/Addis_Ababa',
  }) + ' EAT'
}

interface BookingWithCounselor {
  id: string
  counselorId: string
  counselor: {
    name: string | null
    image: string | null
    counselorProfile?: { specializations: string[] | null } | null
  }
  scheduledAt: Date | null
  duration: number | null
  status: string | null
  sessionType: string
  notes: string | null
}

function toSessionData(b: BookingWithCounselor): SessionData {
  const scheduled = b.scheduledAt || new Date()
  const dbStatus = b.status || 'pending'
  return {
    id: b.id,
    counselorId: b.counselorId,
    counselorName: b.counselor.name || 'Unknown',
    counselorAvatar: b.counselor.image,
    counselorSpecialty: b.counselor.counselorProfile?.specializations?.[0] || '',
    date: formatEATDate(scheduled),
    time: formatEATTime(scheduled),
    duration: b.duration,
    status: dbStatus === 'confirmed' ? 'upcoming' : dbStatus === 'pending' ? 'upcoming' : dbStatus,
    type: b.sessionType,
    notes: b.notes,
  }
}

export async function getSeekerDashboardData(userId: string) {
  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
  })

  if (!userData) throw new Error('User not found')

  const rawBookings = await db.query.booking.findMany({
    where: eq(booking.seekerId, userId),
    with: {
      counselor: {
        columns: { name: true, image: true },
        with: {
          counselorProfile: {
            columns: { specializations: true },
          },
        },
      },
    },
    orderBy: [desc(booking.scheduledAt)],
  })

  const sessions = rawBookings.map(toSessionData)

  const moodEntries = await db.query.moodEntry.findMany({
    where: eq(moodEntry.userId, userId),
    orderBy: [desc(moodEntry.createdAt)],
    limit: 30,
  })

  const moodData: MoodDataPoint[] = [...moodEntries]
    .reverse()
    .map((m) => ({
      date: m.createdAt
        ? m.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'Africa/Addis_Ababa' })
        : '',
      value: m.intensity || 3,
      note: m.notes,
    }))

  const latestAssessment = await db
    .select({ score: assessmentResult.score, interpretation: assessmentResult.interpretation, createdAt: assessmentResult.createdAt })
    .from(assessmentResult)
    .where(eq(assessmentResult.userId, userId))
    .orderBy(desc(assessmentResult.createdAt))
    .limit(1)
    .then((r) => r[0] || null)

  return {
    upcomingSessions: sessions.filter((s) => s.status === 'upcoming'),
    completedSessions: sessions.filter((s) => s.status === 'completed'),
    moodData,
    userName: userData.name || 'User',
    joinedAt: userData.createdAt?.toISOString() || new Date().toISOString(),
    latestAssessment: latestAssessment
      ? {
          score: latestAssessment.score,
          interpretation: latestAssessment.interpretation,
          date: latestAssessment.createdAt?.toISOString() || '',
        }
      : null,
  }
}

export async function getGuideDashboardData(userId: string) {
  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
  })

  if (!userData) throw new Error('User not found')

  const rawBookings = await db.query.booking.findMany({
    where: eq(booking.counselorId, userId),
    with: {
      seeker: {
        columns: { name: true, image: true },
      },
    },
    orderBy: [desc(booking.scheduledAt)],
  })

  const todayStr = formatEATDate(new Date())

  const todaysSessions: GuideSessionData[] = rawBookings
    .filter((b) => {
      const d = b.scheduledAt ? formatEATDate(b.scheduledAt) : ''
      return d === todayStr && b.status !== 'completed' && b.status !== 'cancelled'
    })
    .map((b) => {
      const scheduled = b.scheduledAt || new Date()
      return {
        id: b.id,
        clientId: b.seekerId,
        clientName: b.seeker.name || 'Unknown',
        clientAvatar: b.seeker.image,
        date: formatEATDate(scheduled),
        time: formatEATTime(scheduled),
        duration: b.duration,
        status: b.status || 'pending',
        type: b.sessionType,
      }
    })

  const clientMap = new Map<string, { total: number; lastSession: Date | null }>()
  for (const b of rawBookings) {
    const existing = clientMap.get(b.seekerId)
    if (existing) {
      existing.total++
      if (b.scheduledAt && (!existing.lastSession || b.scheduledAt > existing.lastSession)) {
        existing.lastSession = b.scheduledAt
      }
    } else {
      clientMap.set(b.seekerId, { total: 1, lastSession: b.scheduledAt })
    }
  }

  const activeClients: ClientData[] = Array.from(clientMap.entries()).map(([id, info]) => {
    const b = rawBookings.find((r) => r.seekerId === id)
    return {
      id,
      name: b?.seeker.name || 'Unknown',
      avatar: b?.seeker.image || null,
      lastSession: info.lastSession ? formatEATDate(info.lastSession) : 'N/A',
      totalSessions: info.total,
      status: 'active',
    }
  })

  const bookingRequests: GuideSessionData[] = rawBookings
    .filter((b) => b.status === 'pending')
    .map((b) => {
      const scheduled = b.scheduledAt || new Date()
      return {
        id: b.id,
        clientId: b.seekerId,
        clientName: b.seeker.name || 'Unknown',
        clientAvatar: b.seeker.image,
        date: formatEATDate(scheduled),
        time: formatEATTime(scheduled),
        duration: b.duration,
        status: b.status || 'pending',
        type: b.sessionType,
      }
    })

  return {
    todaysSessions,
    activeClients,
    bookingRequests,
    guideName: userData.name || 'Counselor',
  }
}

export interface GuideClientItem {
  id: string
  name: string
  avatar: string | null
  lastSession: string
  nextSession: string | null
  totalSessions: number
  status: 'active' | 'new' | 'inactive'
  notes: string | null
  bookingId: string | null
}

export async function getGuideClients(userId: string): Promise<GuideClientItem[]> {
  const rawBookings = await db.query.booking.findMany({
    where: eq(booking.counselorId, userId),
    with: {
      seeker: {
        columns: { name: true, image: true },
      },
    },
    orderBy: [desc(booking.scheduledAt)],
  })

  const clientMap = new Map<string, {
    seekerId: string
    name: string
    avatar: string | null
    totalSessions: number
    lastSession: Date | null
    nextSession: Date | null
    lastBookingId: string | null
    status: string | null
  }>()

  for (const b of rawBookings) {
    const sid = b.seekerId
    const existing = clientMap.get(sid)
    if (existing) {
      existing.totalSessions++
      if (b.scheduledAt && (!existing.lastSession || b.scheduledAt > existing.lastSession)) {
        existing.lastSession = b.scheduledAt
        existing.lastBookingId = b.id
      }
      if (b.scheduledAt && b.status === 'confirmed' && (!existing.nextSession || b.scheduledAt < existing.nextSession)) {
        existing.nextSession = b.scheduledAt
      }
    } else {
      clientMap.set(sid, {
        seekerId: sid,
        name: b.seeker.name || 'Unknown',
        avatar: b.seeker.image,
        totalSessions: 1,
        lastSession: b.scheduledAt,
        nextSession: b.status === 'confirmed' ? b.scheduledAt : null,
        lastBookingId: b.id,
        status: b.status,
      })
    }
  }

  return Array.from(clientMap.entries()).map(([id, info]) => {
    const ts = info.lastSession ?? new Date()
    const diff = Date.now() - ts.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(hours / 24)
    const lastSessionStr = hours < 1 ? 'Today' : hours < 24 ? `${hours}h ago` : `${days}d ago`

    const nextSessionStr = info.nextSession
      ? info.nextSession.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'Africa/Addis_Ababa' })
      : null

    const status: 'active' | 'new' | 'inactive' =
      info.status === 'confirmed' ? 'active'
      : info.totalSessions === 1 ? 'new'
      : 'inactive'

    return {
      id,
      name: info.name,
      avatar: info.avatar,
      lastSession: lastSessionStr,
      nextSession: nextSessionStr,
      totalSessions: info.totalSessions,
      status,
      notes: null,
      bookingId: info.lastBookingId,
    }
  })
}

export interface CounselorProfileData {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  reviewCount: number
  yearsExperience: number
  hourlyRate: number
  availability: string[]
  bio: string | null
  avatar: string | null
  languages: string[]
  approach: string
  verified: boolean
  certifications: string[]
}

export async function getCounselorById(counselorId: string): Promise<CounselorProfileData | null> {
  const result = await db.query.user.findFirst({
    where: eq(user.id, counselorId),
    with: {
      counselorProfile: true,
      receivedReviews: true,
    },
  })

  if (!result || result.role !== 'guide') return null

  const profile = result.counselorProfile
  const reviews = result.receivedReviews || []
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : Number(profile?.rating || 0)

  return {
    id: result.id,
    name: result.name || '',
    title: profile?.bio?.split('\n')[0] || 'Licensed Counselor',
    specialties: profile?.specializations || [],
    rating: avgRating,
    reviewCount: reviews.length,
    yearsExperience: 0,
    hourlyRate: Number(profile?.hourlyRate || 0),
    availability: profile?.availability?.split(',').map((s) => s.trim()) || [],
    bio: profile?.bio || null,
    avatar: result.image,
    languages: [],
    approach: profile?.bio?.split('\n\n')[1] || 'Integrative approach combining evidence-based therapies.',
    verified: profile?.status === 'approved',
    certifications: profile?.certifications || [],
  }
}

export async function getCounselors() {
  const allGuides = await db.query.user.findMany({
    where: eq(user.role, 'guide'),
    with: {
      counselorProfile: true,
      receivedReviews: true,
    },
  })

  const counselors = allGuides.filter((c) => c.counselorProfile?.status === 'approved')

  return counselors.map((c): CounselorListItem => {
    const profile = c.counselorProfile
    const reviews = c.receivedReviews || []
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : Number(profile?.rating || 0)

    return {
      id: c.id,
      name: c.name || '',
      title: profile?.bio?.split('\n')[0] || 'Licensed Counselor',
      specialties: profile?.specializations || [],
      rating: avgRating,
      reviewCount: reviews.length,
      yearsExperience: 0,
      hourlyRate: Number(profile?.hourlyRate || 0),
      availability: profile?.availability?.split(',').map((s) => s.trim()) || [],
      bio: profile?.bio || null,
      avatar: c.image,
      languages: [],
      approach: '',
      verified: profile?.status === 'approved',
    }
  })
}

export async function getCounselorsBySearch(query?: string) {
  if (!query || query.trim() === '') {
    return getCounselors()
  }

  const allGuides = await db.query.user.findMany({
    where: and(eq(user.role, 'guide'), ilike(user.name, `%${query}%`)),
    with: {
      counselorProfile: true,
      receivedReviews: true,
    },
  })

  const counselors = allGuides.filter((c) => c.counselorProfile?.status === 'approved')

  return counselors.map((c): CounselorListItem => {
    const profile = c.counselorProfile
    const reviews = c.receivedReviews || []
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : Number(profile?.rating || 0)

    return {
      id: c.id,
      name: c.name || '',
      title: profile?.bio?.split('\n')[0] || 'Licensed Counselor',
      specialties: profile?.specializations || [],
      rating: avgRating,
      reviewCount: reviews.length,
      yearsExperience: 0,
      hourlyRate: Number(profile?.hourlyRate || 0),
      availability: profile?.availability?.split(',').map((s) => s.trim()) || [],
      bio: profile?.bio || null,
      avatar: c.image,
      languages: [],
      approach: '',
      verified: profile?.status === 'approved',
    }
  })
}
