'use server'

import { db } from '@/lib/db'
import { emergencyContact } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

export async function getEmergencyContacts() {
  const userId = await getUserId()

  const contacts = await db
    .select()
    .from(emergencyContact)
    .where(eq(emergencyContact.userId, userId))
    .orderBy(desc(emergencyContact.createdAt))

  return contacts.map((c) => ({
    id: c.id,
    name: c.name,
    relationship: c.relationship,
    phone: c.phone,
    email: c.email,
  }))
}

export async function addEmergencyContact(data: {
  name: string
  relationship?: string
  phone: string
  email?: string
}) {
  const userId = await getUserId()

  await db.insert(emergencyContact).values({
    id: `ec_${Date.now()}`,
    userId,
    name: data.name,
    relationship: data.relationship || null,
    phone: data.phone,
    email: data.email || null,
  })

  revalidatePath('/seeker/profile')
  return { success: true }
}

export async function deleteEmergencyContact(id: string) {
  const userId = await getUserId()

  await db
    .delete(emergencyContact)
    .where(and(eq(emergencyContact.id, id), eq(emergencyContact.userId, userId)))

  revalidatePath('/seeker/profile')
  return { success: true }
}
