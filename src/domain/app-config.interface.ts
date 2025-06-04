export const AppConfigToken = Symbol('AppConfig')

export interface AppConfig {
  environment: string | undefined
  label: string | undefined
  appServer: string | undefined
  swaggerServerUrl: string | undefined
  apiHost: string
  apiPort: string | number
  apiKey: string | undefined
  password: {
    minLength: number
    maxLength: number
    regex: RegExp
    saltRounds: number
  }
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
  jwt: {
    accessTokenExpInSec: number
    refreshTokenExpInSec: number
    publicKeyBase64: string
    privateKeyBase64: string
    algorithm: string
  }
  aws: {
    ses: {
      host: string
      port: number
      user: string
      password: string
      region: string
      from: string
      secure: boolean
    }
  }
  project: {
    projectName: string
    url: string
    timeZone: string
    nameSpace: string
    uploadURL: string
  }
  logLevel: string[]
  fastify: {
    logLevel: string
  }
}
