import { Logger, LogLevel } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import '@/commons/settings/module-alias'
import { ParseBooleanPipe } from '@/commons/utils/parse-boolean-pipe'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

async function bootstrap() {
  const service = new ConfigLoaderService()
  const config: Record<string, any> = service.loadConfig()
  const loggerLevels: LogLevel[] = config.loggerLevels
  const log = new Logger('Bootstrap')

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger: loggerLevels })
  app.useGlobalPipes(new ParseBooleanPipe())
  const addressString = `${config.appServer}:${config.port}`
  log.log(`Current Environment: ${config.environment}`)
  log.log(`Database Host: ${config.database.host}`)
  log.log(`App Server: ${config.appServer}`)
  log.verbose(`Config: ${JSON.stringify(config)}`)

  app.enableCors({
    origin: config.enableCors.origin,
    methods: config.enableCors.methods,
  })

  const options = new DocumentBuilder()
    .setTitle(`${config.label} API Service`)
    .setDescription(`API Documentation for **${config.label} Backend**.`)
    .setVersion('1.0.0')
    .setContact('Wilton O. Ferreira', 'https://www.linkedin.com/in/wof', 'wilton@devtrack.com')
    .addBearerAuth()
    .addTag('Authorization', 'Account Authorization operations')
    .addServer(addressString)
    .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/docs', app, document)
  log.log(`${config.label} API Service in ${addressString}/docs`)
  await app.listen(config.port)
}

bootstrap().then()
