import { Injectable, Logger } from '@nestjs/common'
import { ConfigPort } from '@/core/ports/config.port'
import * as dotenv from 'dotenv'
import * as path from 'path'

@Injectable()
export class ConfigLoaderService implements ConfigPort {
  private readonly logger: Logger = new Logger(ConfigLoaderService.name)
  loadConfig(): Record<string, any> {
    const env = process.env.NODE_ENV || 'default'
    const ROOT_DIR = process.cwd()
    const envFilePath = path.resolve(ROOT_DIR, `.env.${env.toLowerCase()}`)
    dotenv.config({ path: envFilePath })
    this.logger.verbose(`NODE_ENV: ${env}`)

    switch (env) {
      case 'PRODUCTION':
        return require('./environment/production').default()
      case 'HOMOLOGATION':
        return require('./environment/homologation').default()
      case 'DEVELOPMENT':
        return require('./environment/development').default()
      default:
        return require('./environment/default').default()
    }
  }
}
