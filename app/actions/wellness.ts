'use server'

import { db } from '@/lib/db'
import { moodEntry, resource } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

export async function createMoodEntry(data: {
  mood: string
  intensity?: number
  notes?: string
}) {
  const userId = await getUserId()

  const entry = await db
    .insert(moodEntry)
    .values({
      id: `me_${Date.now()}`,
      userId,
      mood: data.mood,
      intensity: data.intensity,
      notes: data.notes,
    })
    .returning()

  revalidatePath('/seeker/dashboard')
  return entry[0]
}

export async function getMoodEntries(limit = 30) {
  const userId = await getUserId()

  const entries = await db
    .select()
    .from(moodEntry)
    .where(eq(moodEntry.userId, userId))
    .orderBy(desc(moodEntry.createdAt))
    .limit(limit)

  return entries
}

export async function getResources(category?: string) {
  const query = db.select().from(resource)

  if (category) {
    query.where(eq(resource.category, category))
  }

  return query.orderBy(desc(resource.createdAt))
}
