import { Injectable } from '@nestjs/common'
import { ConfigPort } from '@/core/ports/config.port'

@Injectable()
export class ConfigLoaderService implements ConfigPort {
  loadConfig(): Record<string, any> {
    const env = process.env.NODE_ENV || 'default'

    switch (env) {
      case 'production':
        return require('./environment/production').default()
      case 'development':
        return require('./environment/development').default()
      default:
        return require('./environment/default').default()
    }
  }
}
