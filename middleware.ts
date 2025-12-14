import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'angelscare_admin_token'

// Routes that don't require authentication
const publicRoutes = ['/admin/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow public admin routes (login page)
  if (publicRoutes.some(route => pathname === route)) {
    return NextResponse.next()
  }

  // Check for auth token
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    // Redirect to login
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Token exists - let the request through
  // Full validation happens in the page/layout
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
