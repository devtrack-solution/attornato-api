import { Logger, LogLevel } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import '@/infrastructure/settings/module-alias'
import { ParseBooleanPipe } from '@/commons/utils/parse-boolean-pipe'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppConfig } from '@/domain/app-config.interface'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { ValidationExceptionFilter } from '@/core/presentation/filters/validation-exception.filter'

async function bootstrap() {
  const config: AppConfig = new ConfigEnvironmentService()

  if (!config) {
    throw new Error('Configuration service is not available')
  }

  const loggerLevels: LogLevel[] = config.logLevel as LogLevel[]
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger: loggerLevels })
  app.useGlobalPipes(new ParseBooleanPipe())
  app.useGlobalFilters(new ValidationExceptionFilter())

  const fastifyInstance = app.getHttpAdapter().getInstance()
  fastifyInstance.log.level = config.fastify.logLevel || 'warn'
  const logger = new Logger('bootstrap')
  logger.log(`Logger Level fastifyInstance: ${fastifyInstance.log.level}`)
  logger.log(`Logger Level config.logLevel: ${config.logLevel}`)
  const addressString = `${config.appServer}:${config.apiPort}`
  logger.log(`Current Environment: ${config.environment}`)
  logger.log(`Database Host: ${config.database.host}`)
  logger.log(`App Server: ${config.appServer}`)

  app.enableCors({
    origin: config.enableCors.origin,
    methods: config.enableCors.methods,
    allowedHeaders: config.enableCors.allowedHeaders,
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

  // Add descriptions to API tags
  // document.tags = [
  //   {
  //     name: 'Permissions',
  //     description: 'Endpoints related to managing permissions in the system',
  //   },
  // ];

  SwaggerModule.setup('/docs', app, document)
  logger.log(`${config.label} API Service in ${addressString}/docs`)
  await app.listen(config.apiPort, config.apiHost)
}

bootstrap().then()
