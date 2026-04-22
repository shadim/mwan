import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedPaths = ['/dashboard'];
// Public routes accessible without auth
const publicPaths = ['/login', '/public', '/api'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // For protected paths, check for refresh token cookie/localStorage
  // Note: middleware runs on edge, can't access localStorage
  // Auth check is done client-side in AuthProvider
  // Middleware only handles basic redirects

  if (pathname === '/') {
    // Root redirects are handled by the page component
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
