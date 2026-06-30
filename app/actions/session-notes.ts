'use server'

import { db } from '@/lib/db'
import { booking, sessionNote } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'
import { encrypt, decrypt } from '@/lib/encryption'

export async function saveSessionNote(bookingId: string, content: string) {
  const userId = await getUserId()

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk) throw new Error('Session not found')
  if (bk.counselorId !== userId) {
    throw new Error('Only the counselor on this booking can save session notes')
  }

  const { iv, ciphertext } = encrypt(content, bookingId)

  await db
    .insert(sessionNote)
    .values({
      id: `sn_${Date.now()}`,
      bookingId,
      counselorId: userId,
      encryptedContent: ciphertext,
      iv,
    })
    .onConflictDoUpdate({
      target: sessionNote.bookingId,
      set: {
        encryptedContent: ciphertext,
        iv,
        updatedAt: new Date(),
      },
    })

  return { success: true }
}

export async function getSessionNote(bookingId: string) {
  const userId = await getUserId()

  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bk) throw new Error('Session not found')
  if (bk.counselorId !== userId) {
    throw new Error('Only the counselor on this booking can view session notes')
  }

  const [note] = await db
    .select()
    .from(sessionNote)
    .where(eq(sessionNote.bookingId, bookingId))
    .limit(1)

  if (!note) return null

  const decrypted = decrypt(note.encryptedContent, note.iv, bookingId)

  return {
    content: decrypted,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  }
}
