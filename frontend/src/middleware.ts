import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/public', '/api'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some(p => pathname.startsWith(p)) || pathname === '/') {
    return NextResponse.next();
  }

  // Protect /dashboard — redirect to login if refresh cookie is absent
  if (pathname.startsWith('/dashboard')) {
    const hasRefreshCookie = request.cookies.has('refreshToken');
    if (!hasRefreshCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
