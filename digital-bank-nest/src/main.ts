/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.use(cookieParser())

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  )

  await app.listen(process.env.SERVER_PORT ?? 3001)
}
bootstrap()
