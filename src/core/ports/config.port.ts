import { AppConfig } from '@/domain/app-config.interface'

export interface ConfigPort {
  initialize(): AppConfig
  loadConfig(): AppConfig
}
