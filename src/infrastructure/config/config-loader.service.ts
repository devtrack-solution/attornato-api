import { Injectable, Logger } from '@nestjs/common'
import { ConfigPort } from '@/core/ports/config.port'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { AppConfig } from '@/application/domain/app-config.interface'

@Injectable()
export class ConfigLoaderService implements ConfigPort {
  private readonly logger: Logger = new Logger(ConfigLoaderService.name)
  private config: AppConfig | null = null

  initialize(): AppConfig {
    const env = process.env.NODE_ENV || 'default'
    const ROOT_DIR = process.cwd()
    const envFilePath = path.resolve(ROOT_DIR, `.env.${env.toLowerCase()}`)
    dotenv.config({ path: envFilePath, override: true })
    this.logger.verbose(`NODE_ENV: ${env}`)

    switch (env) {
      case 'PRODUCTION':
        this.config = require('./environment/production').default()
        break
      case 'HOMOLOGATION':
        this.config = require('./environment/homologation').default()
        break
      case 'DEVELOPMENT':
        this.config = require('./environment/development').default()
        break
      default:
        this.config = require('./environment/default').default()
    }
    return this.config!
  }

  loadConfig(): AppConfig {
    if (this.config) {
      return this.config
    }
    return this.initialize()
  }
}
