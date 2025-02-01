import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { publicMiddleware } from './middlewares/publicMiddleware'
import { privateMiddleware } from './middlewares/privateMiddleware'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (
    req.nextUrl.pathname === '/sign-in' ||
    req.nextUrl.pathname === '/sign-up'
  ) {
    return publicMiddleware(req, isTokenValid, accessToken, refreshToken)
  }

  return privateMiddleware(req, isTokenValid, accessToken, refreshToken)
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
  matcher: ['/sign-in', '/sign-up', '/dashboard/:path*'],
}
