'use server'

import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'
import { getSession } from '@/lib/auth-utils'

export async function getProfileData() {
  const session = await getSession()
  if (!session?.user) throw new Error('Not authenticated')

  const userId = session.user.id
  const sessionUser = session.user

  const [result] = await db
    .select({ count: count() })
    .from(booking)
    .where(eq(booking.seekerId, userId))
  const completedSessionsCount = Number(result?.count || 0)

  return {
    user: {
      name: sessionUser.name || 'User',
      email: sessionUser.email || '',
      avatar: sessionUser.image || '',
      joinedAt: sessionUser.createdAt
        ? new Date(sessionUser.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })
        : 'Recently',
    },
    completedSessionsCount,
  }
}
