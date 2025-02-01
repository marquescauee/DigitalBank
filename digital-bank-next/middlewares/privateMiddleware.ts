import { NextRequest, NextResponse } from 'next/server'

export const privateMiddleware = (
  req: NextRequest,
  isTokenValid: (token: string) => boolean,
  accessToken?: string,
  refreshToken?: string,
) => {
  if (
    (accessToken && isTokenValid(accessToken)) ||
    (refreshToken && isTokenValid(refreshToken))
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/sign-in', req.url))
}
