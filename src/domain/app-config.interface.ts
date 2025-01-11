/*
import { isNumber } from '@nestjs/common/utils/shared.utils'

type DatabaseConfig = Record<'host' | 'port' | 'name' | 'user' | 'password', string | number>
type RedisConfig = Record<'host' | 'port', string | number>

type AppConfig = Record<'label' | 'appServer' | 'apiHost' | 'apiPort' | 'apiKey' | 'database' | 'redis', string | number | DatabaseConfig | RedisConfig>
*/
import { LogLevel } from '@nestjs/common'

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
  },
  throttling: {
    ttl: string | number,
    limit: string | number,
  },
  enableCors: {
    origin: string[] | undefined
    methods: string[] | undefined
  }
  logLevel: string
}
