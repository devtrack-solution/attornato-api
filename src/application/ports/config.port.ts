import { AppConfig } from '@/domain/app-config.interface'

export const ConfigPortSymbol = Symbol('ConfigPortSymbol')

export interface ConfigPort {
  initialize(): AppConfig
  loadConfig(): AppConfig
}
