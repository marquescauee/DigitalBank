import { register } from '@/routes/auth'

type HandleSignUpProps = {
  values: AuthUserData
}

export const handleSignUp = async ({
  values,
}: HandleSignUpProps): Promise<{ error: string | null }> => {
  const registerResponse = await register(values)

  if (registerResponse.error) {
    return {
      error: registerResponse.error,
    }
  }

  return {
    error: null,
  }
}
