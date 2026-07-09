'use server'

import { db } from '@/lib/db'
import { moodEntry, resource } from '@/lib/db/schema'
import { eq, desc, like, and, or } from 'drizzle-orm'
import { getUserId, getSession } from '@/lib/auth-utils'
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

export async function getResourceById(id: string) {
  const [item] = await db.select().from(resource).where(eq(resource.id, id)).limit(1)
  return item || null
}

export async function searchResources(query: string, category?: string) {
  const conditions = [
    like(resource.title, `%${query}%`),
    like(resource.body, `%${query}%`),
  ]

  const dbQuery = db
    .select()
    .from(resource)
    .where(category
      ? and(or(...conditions), eq(resource.category, category))
      : or(...conditions)
    )
    .orderBy(desc(resource.createdAt))

  return dbQuery
}

export async function createResource(data: {
  title: string
  category: string
  body: string
}) {
  const session = await getSession()
  if (!session?.user || session.user.role !== 'steward') {
    throw new Error('Unauthorized')
  }

  const item = await db
    .insert(resource)
    .values({
      id: `res_${Date.now()}`,
      title: data.title,
      category: data.category,
      body: data.body,
    })
    .returning()

  revalidatePath('/seeker/resources')
  revalidatePath('/steward/resources')
  return item[0]
}
