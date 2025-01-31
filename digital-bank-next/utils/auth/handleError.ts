import { AxiosError } from 'axios'

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorMessage =
      (Array.isArray(error.response?.data?.message)
        ? error.response?.data?.message[0]
        : error.response?.data?.message) ?? error.message

    return {
      error: errorMessage,
      statusCode: error.response?.status!,
    }
  }

  return {
    error: 'An unknown error occurred',
    statusCode: 500,
  }
}
