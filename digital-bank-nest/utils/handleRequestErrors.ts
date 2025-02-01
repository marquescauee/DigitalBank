import { HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { serverErrorException } from 'messages/errors/auth'

export const handleHttpError = (error: HttpException, response: Response) => {
  console.error(error)

  return response.status(error.getStatus()).json({ message: error.message })
}

export const handleDefaultError = (response: Response) => {
  return response.status(500).json({ message: serverErrorException })
}

export const handleJwtError = (error: Error, response: Response) => {
  console.error(error)

  return response.status(HttpStatus.UNAUTHORIZED).json({
    message: error.message,
  })
}
