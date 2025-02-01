import { handleError } from '@/utils/auth/handleError'
import axios from 'axios'

export const fetchUser = async (): Promise<UserApiResponse> => {
  try {
    const response = await axios.get<User>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
      {
        withCredentials: true,
      },
    )

    return {
      user: response.data,
      statusCode: response.status,
    }
  } catch (error: unknown) {
    return handleError(error)
  }
}
