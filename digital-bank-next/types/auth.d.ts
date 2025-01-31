interface AuthUserData {
  email: string
  password: string
  firstName?: string
  lastName?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  dateOfBirth?: string
  cpf?: string
}

interface AuthApiResponse {
  error?: string
  message?: string
  statusCode: number
}
