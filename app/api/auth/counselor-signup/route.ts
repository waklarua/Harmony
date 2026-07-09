import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { user, counselorProfile } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { notifyStewards } from '@/app/actions/notifications'

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const signupRes = await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
      headers: req.headers,
      asResponse: true,
    })

    if (!signupRes.ok) {
      const errorBody = await signupRes.json().catch(() => ({ message: 'Signup failed' }))
      return NextResponse.json({ error: errorBody.message || 'Signup failed' }, { status: signupRes.status })
    }

    const signupData = await signupRes.json()
    const userId = signupData.user?.id || signupData.id

    await db.update(user).set({ role: 'guide' }).where(eq(user.id, userId))

    await db.insert(counselorProfile).values({
      id: `cp_${Date.now()}`,
      userId,
      bio: body.bio || null,
      specializations: body.specializations || null,
      yearsOfExperience: body.yearsOfExperience || null,
      licenseNumber: body.licenseNumber || null,
      licenseDocumentUrl: body.licenseDocumentUrl || null,
      status: 'pending',
    })

    const name = body.name || 'A new counselor'
    notifyStewards(`${name} has signed up as a counselor and is awaiting review.`).catch(() => {})

    const response = NextResponse.json({ success: true })
    const setCookie = signupRes.headers.get('set-cookie')
    if (setCookie) {
      response.headers.set('set-cookie', setCookie)
    }

    return response
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
