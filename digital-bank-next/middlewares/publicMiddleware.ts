import { NextRequest, NextResponse } from 'next/server'

export const publicMiddleware = (
  req: NextRequest,
  isTokenValid: (token: string) => boolean,
  accessToken?: string,
  refreshToken?: string,
) => {
  if (
    (accessToken && isTokenValid(accessToken)) ||
    (refreshToken && isTokenValid(refreshToken))
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}
