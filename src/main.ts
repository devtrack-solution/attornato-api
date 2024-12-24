import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import '@/commons/settings/module-alias'
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { ParseBooleanPipe } from '@/commons/utils/parse-boolean-pipe'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  dotenv.config()
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.useGlobalPipes(new ParseBooleanPipe())
  const configService = app.get<ConfigService>(ConfigService)
  logger.log(`Current Environment: ${configService.get<string>('environment') as string}`)
  logger.log(`Database Host: ${configService.get<string>('database.host')}`)
  logger.log(`App Server: ${configService.get<string>('appServer')}`)

  app.enableCors({
    origin: ['http://0.0.0.0:4200', 'http://localhost:4200', 'http://localhost:4201', 'http://localhost:3010', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'OPTIONS'],
  })
  const options = new DocumentBuilder()
    .setTitle(`${configService.get<string>('label')}  API Service`)
    .setDescription(`API Documentation for **${configService.get<string>('label')} Backend**.`)
    .setVersion('1.0.0')
    .setContact('Wilton O. Ferreira', 'https://www.linkedin.com/in/wof', 'wilton@devtrack.com')
    .addBearerAuth()
    .addTag('Authorization', 'Account Authorization operations')
    .addServer(configService.get<string>('appServer') as string)
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/docs', app, document)
  logger.log(`${configService.get<string>('label')} API Service in http://localhost:${configService.get<number>('port')}/docs`)
  await app.listen(configService.get<number>('port') as number)
}

bootstrap().then()
