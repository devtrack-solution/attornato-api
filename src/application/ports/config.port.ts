import { AppConfig } from '@/domain/app-config.interface'

export const ConfigPortSymbol = Symbol('ConfigPortSymbol')

/**
 * Interface representing a configuration port with methods for initialization and loading configuration.
 */
export interface ConfigPort {
  /**
   * Initializes the configuration.
   *
   * @returns The application configuration.
   */
  initialize(): AppConfig;

  /**
   * Loads the configuration.
   *
   * @returns The application configuration.
   */
  loadConfig(): AppConfig;
}
