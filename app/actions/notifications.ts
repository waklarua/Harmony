'use server'

import { db } from '@/lib/db'
import { notification, user } from '@/lib/db/schema'
import { eq, desc, and, count, sql } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

export async function createNotification(
  userId: string,
  message: string,
  type: 'booking' | 'message' | 'system' = 'system'
) {
  await db.insert(notification).values({
    id: `notif_${Date.now()}`,
    userId,
    message,
    type,
    isRead: false,
  })
}

export async function notifyStewards(message: string) {
  const stewards = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.role, 'steward'))

  for (const s of stewards) {
    await createNotification(s.id, message, 'system')
  }
}

export async function getNotifications() {
  const userId = await getUserId()

  const notifications = await db
    .select()
    .from(notification)
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(50)

  return notifications
}

export async function getUnreadCount() {
  const userId = await getUserId()

  const [result] = await db
    .select({ count: count() })
    .from(notification)
    .where(
      and(eq(notification.userId, userId), eq(notification.isRead, false))
    )

  return Number(result?.count ?? 0)
}

export async function markAsRead(notificationId: string) {
  const userId = await getUserId()

  await db
    .update(notification)
    .set({ isRead: true })
    .where(
      and(eq(notification.id, notificationId), eq(notification.userId, userId))
    )

  revalidatePath('/')
}

export async function markAllAsRead() {
  const userId = await getUserId()

  await db
    .update(notification)
    .set({ isRead: true })
    .where(and(eq(notification.userId, userId), eq(notification.isRead, false)))

  revalidatePath('/')
}
