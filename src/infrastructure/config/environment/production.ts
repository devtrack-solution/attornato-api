import process from 'node:process'

export default () => ({
  environment: process.env.ENVIRONMENT || 'PRODUCTION',
  label: process.env.LABEL,
  appServer: process.env.APP_SERVER,
  port: process.env.PORT || 8080,
  apiKey: process.env.API_KEY,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
  },
  enableCors: {
    origin: process.env.ENABLE_CORS_ORIGIN?.split(',') || [],
    methods: process.env.ENABLE_CORS_METHODS?.split(',') || [],
  },
  throttling: {
    ttl: process.env.THROTTLER_TTL || 60,
    limit: process.env.THROTTLER_LIMIT || 10,
  },
  loggerLevel: process.env.LOG_LEVEL?.split(',') || [],
})
