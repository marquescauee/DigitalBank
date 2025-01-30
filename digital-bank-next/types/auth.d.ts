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
  ssn?: string
}

interface ApiResponse {
  error?: string
  message?: string
  statusCode: number
}
