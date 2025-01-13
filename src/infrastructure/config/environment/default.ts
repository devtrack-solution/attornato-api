import { AppConfig } from '@/application/domain/app-config.interface'
import process from 'node:process'

export default (): AppConfig => ({
  environment: 'DEFAULT',
  label: 'My Application',
  appServer: 'http://0.0.0.0',
  apiHost: '0.0.0.0',
  apiPort: 3000,
  apiKey: 'default-key',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'api-template',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    logging: false,
    logLevel: 'error',
  },
  enableCors: {
    origin: ['http://0.0.0.0:4200', 'http://localhost:4200', 'http://localhost:4201', 'http://localhost:3010', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'OPTIONS'],
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
  throttling: {
    ttl: process.env.THROTTLER_TTL || 60,
    limit: process.env.THROTTLER_LIMIT || 10,
  },
  logLevel: process.env.LOG_LEVEL || 'fatal',
})
