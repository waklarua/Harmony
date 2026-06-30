import { NextResponse } from 'next/server'
import { checkMissedSessions } from '@/app/actions/booking'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const secret = process.env.CRON_SECRET

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await checkMissedSessions()
    return NextResponse.json(result)
  } catch (err) {
    console.error('[cron] check-missed-sessions failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
