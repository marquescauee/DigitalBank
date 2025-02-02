declare interface RequestWithCookies extends Request {
  cookies: { [key: string]: string }
  id: string
  email: string
}

declare interface JwtPayload {
  id: string
}

declare interface TokenRequest {
  accessToken: string
}
