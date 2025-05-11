import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define paths for which authentication is required
const protectedRoutes = ['/admin/:path*']

// Define auth pages (public, but should redirect if logged in)
const authPaths = ['/signin', '/signup']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // 🔒 If accessing protected route and not logged in → redirect to signin
  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // ✅ If logged in and accessing auth pages → redirect to dashboard
  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // ✅ Allow other requests
  return NextResponse.next()
}

// Match all routes, but apply logic conditionally
export const config = {
  matcher: ['/admin/:path*', '/signin', '/signup'],
}
