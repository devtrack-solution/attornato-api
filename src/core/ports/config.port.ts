import { AppConfig } from '@/application/domain/app-config.interface'

export interface ConfigPort {
  initialize(): AppConfig
  loadConfig(): AppConfig
}
