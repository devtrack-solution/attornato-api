import * as process from 'node:process'
import { AppConfig } from '@/application/domain/app-config.interface'

export default (): AppConfig => ({
  environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
  label: process.env.LABEL,
  appServer: process.env.APP_SERVER,
  apiHost: process.env.API_HOST || '0.0.0.0',
  apiPort: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: process.env.DB_LOGGING === 'true',
    logLevel: process.env.DB_LOG_LEVEL,
  },
  enableCors: {
    origin: process.env.ENABLE_CORS_ORIGIN?.split(',') || [],
    methods: process.env.ENABLE_CORS_METHODS?.split(',') || [],
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
  },
  throttling: {
    ttl: process.env.THROTTLER_TTL || 60,
    limit: process.env.THROTTLER_LIMIT || 10,
  },
  logLevel: process.env.LOG_LEVEL || 'info',
})
