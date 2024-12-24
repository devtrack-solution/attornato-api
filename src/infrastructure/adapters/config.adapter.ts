import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from '@/domain/app-config.interface'

@Injectable()
export class ConfigAdapter implements AppConfig {
  constructor(private readonly configService: ConfigService) {}

  // @ts-ignore
  get database() {
    return {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
    }
  }

  // @ts-ignore
  get apiKey() {
    return this.configService.get<string>('apiKey')
  }
}
