'use server'

import { db } from '@/lib/db'
import { therapyGoal } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

export async function getTherapyGoals() {
  const userId = await getUserId()

  const goals = await db
    .select()
    .from(therapyGoal)
    .where(eq(therapyGoal.userId, userId))
    .orderBy(desc(therapyGoal.createdAt))

  return goals.map((g) => ({
    id: g.id,
    goal: g.goal,
    status: g.status || 'active',
    targetDate: g.targetDate?.toISOString().split('T')[0] || null,
  }))
}

export async function addTherapyGoal(data: {
  goal: string
  targetDate?: string
}) {
  const userId = await getUserId()

  await db.insert(therapyGoal).values({
    id: `tg_${Date.now()}`,
    userId,
    goal: data.goal,
    targetDate: data.targetDate ? new Date(data.targetDate) : null,
  })

  revalidatePath('/seeker/profile')
  return { success: true }
}

export async function updateGoalStatus(id: string, status: string) {
  const userId = await getUserId()

  await db
    .update(therapyGoal)
    .set({ status, updatedAt: new Date() })
    .where(and(eq(therapyGoal.id, id), eq(therapyGoal.userId, userId)))

  revalidatePath('/seeker/profile')
  return { success: true }
}

export async function deleteTherapyGoal(id: string) {
  const userId = await getUserId()

  await db
    .delete(therapyGoal)
    .where(and(eq(therapyGoal.id, id), eq(therapyGoal.userId, userId)))

  revalidatePath('/seeker/profile')
  return { success: true }
}
