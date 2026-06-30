'use server'

import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getUserId } from '@/lib/auth-utils'

export async function createVideoRoom(bookingId: string) {
  const JITSI_CONFIG = 'config.disableLobby=true&config.prejoinPageEnabled=false&config.enableWelcomePage=false&config.hideAuthSection=true&config.startWithVideoMuted=false&config.startWithAudioMuted=false'
  const roomUrl = `https://meet.jit.si/harmony-${bookingId}#${JITSI_CONFIG}`
  await db
    .update(booking)
    .set({ videoRoomUrl: roomUrl })
    .where(eq(booking.id, bookingId))
  return { roomUrl }
}

export async function getSessionVideoInfo(bookingId: string) {
  const userId = await getUserId()
  const [bk] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)
  if (!bk || (bk.seekerId !== userId && bk.counselorId !== userId)) {
    throw new Error('Unauthorized')
  }
  const JITSI_CONFIG = 'config.disableLobby=true&config.prejoinPageEnabled=false&config.enableWelcomePage=false&config.hideAuthSection=true&config.startWithVideoMuted=false&config.startWithAudioMuted=false'
  return { roomUrl: `https://meet.jit.si/harmony-${bookingId}#${JITSI_CONFIG}` }
}
