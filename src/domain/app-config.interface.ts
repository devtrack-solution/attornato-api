export interface AppConfig {
  environment: string | undefined
  label: string | undefined
  appServer: string | undefined
  apiHost: string
  apiPort: string | number
  apiKey: string | undefined
  database: {
    host: string | undefined
    port: string | number | undefined
    name: string | undefined
    user: string | undefined
    password: string | undefined
    logging: boolean | undefined
    logLevel: string | undefined
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
  }
  logLevel: string[]
  fastify: {
    logLevel: string
  }
}
