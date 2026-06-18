import { NextRequest, NextResponse } from 'next/server'
import { pusher } from '@/lib/pusher'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const socketId = formData.get('socket_id') as string
    const channelName = formData.get('channel_name') as string

    if (!socketId || !channelName) {
      return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 })
    }

    // Extract bookingId from channel name: private-session-{bookingId}
    const match = channelName.match(/^private-session-(.+)$/)
    if (!match) {
      return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })
    }
    const bookingId = match[1]

    // Verify user is part of this booking
    const [bk] = await db
      .select()
      .from(booking)
      .where(eq(booking.id, bookingId))
      .limit(1)

    if (!bk || (bk.seekerId !== session.user.id && bk.counselorId !== session.user.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const authResponse = pusher.authorizeChannel(socketId, channelName)
    return NextResponse.json(authResponse)
  } catch (err) {
    console.error('[pusher/auth]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
