import { handleError } from '@/utils/auth/handleError'
import axios from 'axios'

export const register = async (values: AuthUserData): Promise<ApiResponse> => {
  try {
    const updatedValues = {
      ...values,
      postalCode: values?.postalCode?.replace(/\D/g, '').slice(0, 8),
      dateOfBirth: new Date(values.dateOfBirth ?? '').toISOString(),
      ssn: values?.ssn?.replace(/\D/g, ''),
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-up`,
      updatedValues,
    )

    return {
      message: response.data.message,
      statusCode: response.data.statusCode,
    }
  } catch (error: unknown) {
    return handleError(error)
  }
}

export const login = async (values: AuthUserData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-in`,
      {
        email: values.email,
        password: values.password,
      },
      {
        withCredentials: true,
      },
    )

    return {
      message: response.data.message,
      statusCode: response.data.statusCode,
    }
  } catch (error) {
    return handleError(error)
  }
}

export const validateToken = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/validate-token`,
      {
        withCredentials: true,
      },
    )

    return {
      message: response.data.message,
      statusCode: response.data.statusCode,
    }
  } catch (error) {
    return handleError(error)
  }
}

export const refreshToken = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh-token`,
      {
        withCredentials: true,
      },
    )

    return {
      message: response.data.message,
      statusCode: response.data.statusCode,
    }
  } catch (error) {
    return handleError(error)
  }
}
