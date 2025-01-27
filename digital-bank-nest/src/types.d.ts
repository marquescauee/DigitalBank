declare interface RequestWithCookies extends Request {
  cookies: { [key: string]: string }
}

declare interface JwtPayload {
  id: string
}
