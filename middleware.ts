import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for Better Auth session cookie
  // The actual session validation happens in page-level getSession() calls
  // This middleware just provides a quick redirect for unauthenticated users
  const sessionCookie = request.cookies.get('better-auth.session_token')

  const isProtectedRoute = ['/seeker', '/guide', '/steward'].some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  // If no session cookie and trying to access protected route, redirect to login
  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If has session cookie and on login/signup page, redirect to dashboard
  const isAuthPage = ['/login', '/signup'].includes(request.nextUrl.pathname)
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(new URL('/seeker/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/seeker/:path*',
    '/guide/:path*',
    '/steward/:path*',
    '/login',
    '/signup',
  ],
}
