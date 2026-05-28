import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const isProtectedRoute = ['/seeker', '/guide', '/steward'].some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check role-based access
  if (request.nextUrl.pathname.startsWith('/seeker') && session?.user?.role !== 'seeker') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/guide') && session?.user?.role !== 'guide') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/steward') && session?.user?.role !== 'steward') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/seeker/:path*', '/guide/:path*', '/steward/:path*'],
}
