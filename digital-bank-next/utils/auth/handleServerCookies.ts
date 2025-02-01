import { cookies } from 'next/headers'

export const getServerCookies = async () => {
  const cookieStore = await cookies()
  const refreshTokenCookie = cookieStore.get('refreshToken')
  const accessTokenCookie = cookieStore.get('accessToken')

  const cookieHeader = [
    refreshTokenCookie
      ? `${refreshTokenCookie.name}=${refreshTokenCookie.value}`
      : '',
    accessTokenCookie
      ? `${accessTokenCookie.name}=${accessTokenCookie.value}`
      : '',
  ]
    .filter(Boolean)
    .join('; ')

  return cookieHeader
}
