import { ConfigLoaderService } from './config-loader.service'
import * as defaultConfig from './environment/default'
import * as developmentConfig from './environment/development'
import * as productionConfig from './environment/production'

describe('ConfigLoaderService', () => {
  let service: ConfigLoaderService

  beforeEach(() => {
    service = new ConfigLoaderService()
  })

  it('should load default configuration when NODE_ENV is not set', () => {
    const defaultSpy = jest.spyOn(defaultConfig, 'default').mockReturnValue({
      environment: 'DEFAULT',
      database: { host: 'localhost', port: 5432 },
      apiKey: 'default-key',
      label: 'Default Application',
      appServer: 'http://localhost',
      port: 3000,
    })

    delete process.env.NODE_ENV
    const config = service.loadConfig()

    expect(config).toEqual({
      environment: 'DEFAULT',
      database: { host: 'localhost', port: 5432 },
      apiKey: 'default-key',
      label: 'Default Application',
      appServer: 'http://localhost',
      port: 3000,
    })

    expect(defaultSpy).toHaveBeenCalled()
    defaultSpy.mockRestore()
  })

  it('should load development configuration when NODE_ENV is "development"', () => {
    const developmentSpy = jest.spyOn(developmentConfig, 'default').mockReturnValue({
      environment: 'DEVELOPMENNT',
      database: { host: 'dev-db-host', port: 5432 },
      apiKey: 'dev-key',
      label: 'Development Application',
      appServer: 'http://dev.localhost',
      port: 4000,
    })

    process.env.NODE_ENV = 'development'
    const config = service.loadConfig()

    expect(config).toEqual({
      environment: 'DEVELOPMENNT',
      database: { host: 'dev-db-host', port: 5432 },
      apiKey: 'dev-key',
      label: 'Development Application',
      appServer: 'http://dev.localhost',
      port: 4000,
    })

    expect(developmentSpy).toHaveBeenCalled()
    developmentSpy.mockRestore()
  })

  it('should load production configuration when NODE_ENV is "production"', () => {
    const productionSpy = jest.spyOn(productionConfig, 'default').mockReturnValue({
      environment: 'PRODUCTION',
      database: { host: 'prod-db-host', port: 5432 },
      apiKey: 'prod-key',
      label: 'Production Application',
      appServer: 'https://myapp.com',
      port: 8080,
    })

    process.env.NODE_ENV = 'production'
    const config = service.loadConfig()

    expect(config).toEqual({
      environment: 'PRODUCTION',
      database: { host: 'prod-db-host', port: 5432 },
      apiKey: 'prod-key',
      label: 'Production Application',
      appServer: 'https://myapp.com',
      port: 8080,
    })

    expect(productionSpy).toHaveBeenCalled()
    productionSpy.mockRestore()
  })
})
