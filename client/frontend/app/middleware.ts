import { NextRequest, NextResponse } from 'next/server';

export { auth as middleware } from '@/lib/auth/auth'

export const config = {
  matcher: ['/dashboard/:path*'], // protected routes
}
