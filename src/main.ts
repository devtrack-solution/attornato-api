import { Logger, LogLevel } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import '@/infrastructure/settings/module-alias'
import { ParseBooleanPipe } from '@/application/commons/utils/parse-boolean-pipe'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { AppConfig } from '@/application/domain/app-config.interface'

async function bootstrap() {
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  app.useGlobalPipes(new ParseBooleanPipe())
  const configLoaderService: ConfigLoaderService = app.get(ConfigLoaderService)
  const config: AppConfig = configLoaderService.initialize()
  // const loggerLevels: LogLevel[] = config.loggerLevels || ['log', 'error', 'warn', 'debug', 'verbose']

  const logger = new Logger('bootstrap')

  const fastifyInstance = app.getHttpAdapter().getInstance()
  fastifyInstance.log.level = 'info' // config.logLevel || 'fatal'
  logger.log(`Logger Level fastifyInstance: ${fastifyInstance.log.level}`)
  logger.log(`Logger Level config.logLevel: ${config.logLevel}`)
  const addressString = `${config.appServer}:${config.apiPort}`
  logger.log(`Current Environment: ${config.environment}`)
  logger.log(`Database Host: ${config.database.host}`)
  logger.log(`App Server: ${config.appServer}`)
  logger.verbose(`Config: ${JSON.stringify(config)}`)

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
  logger.log(`${config.label} API Service in ${addressString}/docs`)
  await app.listen(config.apiPort, config.apiHost)
}

bootstrap().then()
