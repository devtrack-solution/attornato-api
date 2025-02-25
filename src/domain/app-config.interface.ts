export interface AppConfig {
  environment: string | undefined
  label: string | undefined
  appServer: string | undefined
  swaggerServerUrl: string | undefined
  apiHost: string
  apiPort: string | number
  apiKey: string | undefined
  database: {
    type: string
    host: string | undefined
    port: string | number
    name: string | undefined
    user: string | undefined
    password: string | undefined
    debug: boolean | undefined
    logLevel: string[]
    sync: boolean | undefined
    format: string | undefined
    timezone: string | undefined
    ssl: boolean
  }
  redis: {
    host: string | undefined
    port: string | number | undefined
    ttl: string | number
  }
  throttling: {
    ttl: string | number
    limit: string | number
  }
  enableCors: {
    origin: string[] | undefined
    methods: string[] | undefined
    allowedHeaders: string[] | undefined
  }
  logLevel: string[]
  fastify: {
    logLevel: string
  }
}
