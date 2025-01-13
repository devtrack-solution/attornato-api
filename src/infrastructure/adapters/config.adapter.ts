import { Injectable, LogLevel } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '@/application/domain/app-config.interface'
import process from 'node:process'

@Injectable()
export class ConfigAdapter implements AppConfig {
  constructor(private readonly configService: ConfigService) {}

  get environment(): string | undefined {
    return this.configService.get<string>('environment')
  }
  get label(): string | undefined {
    return this.configService.get<string>('label')
  }
  get appServer(): string | undefined {
    return this.configService.get<string>('appServer')
  }
  get apiHost(): string {
    return this.configService.get<string>('apiHost') || '0.0.0.0'
  }
  get apiPort(): number {
    return this.configService.get<number>('apiPort') || 3000
  }
  get apiKey(): string | undefined {
    return this.configService.get<string>('apiKey')
  }
  get database(): AppConfig['database'] {
    return {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      name: this.configService.get<string>('database.name'),
      user: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      logging: this.configService.get<boolean>('database.logging'),
      logLevel: this.configService.get<string>('database.logLevel'),
    }
  }
  get redis(): AppConfig['redis'] {
    return {
      host: this.configService.get<string>('redis.host'),
      port: this.configService.get<number>('redis.port'),
      ttl: this.configService.get<number>('redis.ttl')!,
    }
  }
  get enableCors(): AppConfig['enableCors'] {
    return {
      origin: this.configService.get<string[]>('enableCors.origin'),
      methods: this.configService.get<string[]>('enableCors.methods'),
    }
  }
  get throttling(): AppConfig['throttling'] {
    return {
      ttl: this.configService.get<number>('throttling.ttl')!,
      limit: this.configService.get<number>('throttling.limit')!,
    }
  }
  /**
   * export type pino. LevelWithSilentOrString = LevelWithSilent | string
   *
   * Initial type:
   * "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent" | string
   */
  get logLevel(): string {
    return this.configService.get<string>('logLevel') || 'fatal'
  }
}
