import { Injectable } from '@nestjs/common'
import { AppConfig } from '@/domain/app-config.interface'
import process from 'node:process'

@Injectable()
export class ConfigEnvironmentService implements AppConfig {
  constructor() {}

  get environment(): string | undefined {
    return process.env.ENVIRONMENT || 'DEVELOPMENT'
  }
  get label(): string | undefined {
    return process.env.LABEL
  }
  get appServer(): string | undefined {
    return process.env.APP_SERVER
  }
  get apiHost(): string {
    return process.env.API_HOST || '0.0.0.0'
  }
  get apiPort(): number {
    return Number(process.env.API_PORT) || 3000
  }

  get swaggerServerUrl(): string {
    return process.env.SWAGGER_SERVER_URL || 'http://localhost:3000'
  }
  get apiKey(): string | undefined {
    return process.env.API_KEY
  }
  get database(): AppConfig['database'] {
    return {
      type: process.env.DB_TYPE || 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      debug: process.env.DB_DEBUG === 'true',
      logLevel: process.env.DB_LOG_LEVEL?.split(',') || [],
      sync: process.env.DB_SYNC === 'true',
      format: process.env.DB_LOG_FORMAT,
      timezone: process.env.DB_TIMEZONE,
      ssl: process.env.DB_SSL === 'false',
    }
  }

  get password(): AppConfig['password'] {
    return {
      minLength: Number(process.env.PASSWORD_MIN_LENGTH) || 8,
      maxLength: Number(process.env.PASSWORD_MAX_LENGTH) || 32,
      regex: new RegExp(process.env.PASSWORD_REGEX || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
      saltRounds: Number(process.env.PASSWORD_SALT_ROUNDS) || 10,
    }
  }

  get redis(): AppConfig['redis'] {
    return {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT || 6379,
      ttl: process.env.REDIS_TTL || 60,
    }
  }
  get enableCors(): AppConfig['enableCors'] {
    return {
      origin: process.env.ENABLE_CORS_ORIGIN?.split(',') || [],
      methods: process.env.ENABLE_CORS_METHODS?.split(',') || [],
      allowedHeaders: process.env.ENABLE_CORS_ALLOWED_HEADERS?.split(',') || [],
    }
  }
  get throttling(): AppConfig['throttling'] {
    return {
      ttl: process.env.THROTTLER_TTL || 60,
      limit: process.env.THROTTLER_LIMIT || 10,
    }
  }

  get jwt(): AppConfig['jwt'] {
    return {
      accessTokenExpInSec: Number(process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC) || 3600,
      refreshTokenExpInSec: Number(process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC) || 86400,
      publicKeyBase64: process.env.JWT_PUBLIC_KEY_BASE64 || '',
      privateKeyBase64: process.env.JWT_PRIVATE_KEY_BASE64 || '',
      algorithm: process.env.JWT_ALGORITHM || 'RS512',
    }
  }

  get aws(): AppConfig['aws'] {
    return {
      ses: {
        host: process.env.AWS_SES_HOST || '',
        port: parseInt(process.env.AWS_SES_PORT || '465', 10),
        user: process.env.AWS_SES_USER || '',
        password: process.env.AWS_SES_PASS || '',
        region: process.env.AWS_SES_REGION || '',
        from: process.env.AWS_SES_FROM || '',
        secure: process.env.AWS_SES_SECURE === 'true',
      },
    }
  }
  get project(): AppConfig['project'] {
    return {
      projectName: process.env.PROJECT_NAME || 'DEFAULT',
      url: process.env.URL || 'http://localhost:4200',
      timeZone: process.env.TIMEZONE || 'America/Sao_Paulo',
      nameSpace: process.env.PINECONE_NAMESPACE || 'DEV',
      uploadURL: process.env.UPLOAD_URL || 'DEFAULT',
    }
  }
  /**
   * export type pino. LevelWithSilentOrString = LevelWithSilent | string
   *
   * Initial type:
   * "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent" | string
   */
  get logLevel(): string[] {
    return process.env.LOG_LEVEL?.split(',') || ['log', 'error', 'warn', 'debug', 'verbose']
  }

  get fastify(): AppConfig['fastify'] {
    return {
      logLevel: process.env.FASTIFY_LOG_LEVEL || 'info',
    }
  }
}
