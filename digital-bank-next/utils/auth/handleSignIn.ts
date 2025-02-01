import { login } from '@/routes/auth'

type HandleSignInProps = {
  values: AuthUserData
}

export const handleSignIn = async ({
  values,
}: HandleSignInProps): Promise<{ error: string | null }> => {
  const loginResponse = await login(values)

  if (loginResponse.error) {
    return {
      error: loginResponse.error,
    }
  }

  return {
    error: null,
  }
}
