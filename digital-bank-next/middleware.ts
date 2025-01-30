import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest) {
  const accessTokenCookie = req.cookies.get('accessToken')?.value
  const refreshTokenCookie = req.cookies.get('refreshToken')?.value
  const previousPage = req.headers.get('referer') || '/'

  if (
    (accessTokenCookie && isTokenValid(accessTokenCookie)) ||
    (refreshTokenCookie && isTokenValid(refreshTokenCookie))
  ) {
    return NextResponse.redirect(new URL(previousPage, req.url))
  }

  return NextResponse.next()
}

const isTokenValid = (token: string) => {
  try {
    const decoded = jwt.decode(token) as { exp?: number } | null

    if (!decoded?.exp) return false

    const now = Math.floor(Date.now() / 1000)
    return decoded.exp > now
  } catch (error) {
    return false
  }
}

export const config = {
  matcher: ['/sign-in', '/sign-up'],
}
