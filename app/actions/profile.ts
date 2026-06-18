'use server'

import { db } from '@/lib/db'
import { booking, user } from '@/lib/db/schema'
import { eq, or, desc, inArray } from 'drizzle-orm'
import { getSession } from '@/lib/auth-utils'

export async function getProfileData() {
  const session = await getSession()
  if (!session?.user) throw new Error('Not authenticated')

  const userId = session.user.id
  const sessionUser = session.user

  const bookings = await db
    .select()
    .from(booking)
    .where(eq(booking.seekerId, userId))
    .orderBy(desc(booking.scheduledAt))

  const counselorIds = [...new Set(bookings.map((b) => b.counselorId))]

  const counselors = counselorIds.length > 0
    ? await db.select().from(user).where(inArray(user.id, counselorIds))
    : []

  const counselorMap = new Map(counselors.map((c) => [c.id, c]))

  const upcoming = bookings
    .filter((b) => b.status !== 'completed' && b.status !== 'cancelled')
    .slice(0, 5)
    .map((b) => {
      const c = counselorMap.get(b.counselorId)
      return {
        id: b.id,
        counselorName: c?.name || 'Unknown',
        counselorAvatar: c?.image || '',
        date: b.scheduledAt.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        time:
          b.scheduledAt.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'Africa/Addis_Ababa',
          }) + ' EAT',
        type: b.sessionType.charAt(0).toUpperCase() + b.sessionType.slice(1) + ' Session',
      }
    })

  const completedSessionsCount = bookings.filter((b) => b.status === 'completed').length

  const past = bookings
    .filter((b) => b.status === 'completed')
    .slice(0, 10)
    .map((b) => {
      const c = counselorMap.get(b.counselorId)
      return {
        id: b.id,
        counselorName: c?.name || 'Unknown',
        counselorAvatar: c?.image || '',
        date: b.scheduledAt.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        rating: 5,
      }
    })

  return {
    user: {
      name: sessionUser.name || 'User',
      avatar: sessionUser.image || '',
      email: sessionUser.email || '',
      joinedAt: sessionUser.createdAt
        ? new Date(sessionUser.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })
        : 'Recently',
    },
    upcomingSessions: upcoming,
    pastSessions: past,
    completedSessionsCount,
  }
}
