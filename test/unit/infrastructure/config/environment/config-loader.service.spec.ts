import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import * as defaultConfig from '@/infrastructure/config/environment/default'
import * as developmentConfig from '@/infrastructure/config/environment/development'
import * as productionConfig from '@/infrastructure/config/environment/production'

describe('ConfigLoaderService', () => {
  let service: ConfigLoaderService

  beforeEach(() => {
    service = new ConfigLoaderService()
  })

  it('should load default configuration when NODE_ENV is not set', () => {
    const defaultSpy = jest.spyOn(defaultConfig, 'default').mockReturnValue({
      environment: 'DEFAULT',
      database: {
        host: 'localhost',
        port: 5432,
        name: 'api',
        user: 'postgres',
        password: 'postgres',
        logging: false,
        logLevel: 'error',
      },
      apiKey: 'default-key',
      label: 'Default Application',
      appServer: 'http://localhost',
      apiPort: 3000,
      enableCors: { origin: [], methods: [] },
      logLevel: 'error',
      apiHost: '',
      redis: {
        host: undefined,
        port: undefined,
        ttl: '',
      },
      throttling: {
        ttl: '',
        limit: '',
      },
      logLevel: 'error',
      apiHost: '',
      redis: {
        host: undefined,
        port: undefined,
      },
      throttling: {
        ttl: '',
        limit: '',
      },
    })

    delete process.env.NODE_ENV
    const config = service.loadConfig()

    expect(defaultSpy).toHaveBeenCalled()
    expect(defaultSpy).toHaveBeenCalledTimes(1)
    expect(config).toEqual(defaultSpy.mock.results[0].value)
    defaultSpy.mockRestore()
  })

  it('should load development configuration when NODE_ENV is "DEVELOPMENT"', () => {
    const developmentSpy = jest.spyOn(developmentConfig, 'default').mockReturnValue({
      environment: 'DEVELOPMENT',
      database: {
        host: 'localhost',
        port: 5432,
        name: undefined,
        user: undefined,
        password: undefined,
        logging: undefined,
        logLevel: undefined,
      },
      apiKey: 'dev-key',
      label: 'Development Application',
      appServer: 'http://localhost',
      apiPort: 4000,
      enableCors: { origin: [], methods: [] },
      logLevel: 'error',
      apiHost: '',
      redis: {
        host: undefined,
        port: undefined,
        ttl: '',
      },
      throttling: {
        ttl: '',
        limit: '',
      },
      logLevel: 'error',
      apiHost: '',
      redis: {
        host: undefined,
        port: undefined,
      },
      throttling: {
        ttl: '',
        limit: '',
      },
    })

    process.env.NODE_ENV = 'DEVELOPMENT'
    const config = service.loadConfig()

    expect(developmentSpy).toHaveBeenCalled()
    expect(developmentSpy).toHaveBeenCalledTimes(1)
    expect(config).toEqual(developmentSpy.mock.results[0].value)
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
      enableCors: { origin: [], methods: [] },
      loggerLevel: [],
      throttling: { ttl: '', limit: '' },
    })

    process.env.NODE_ENV = 'PRODUCTION'
    const config = service.loadConfig()

    expect(productionSpy).toHaveBeenCalled()
    expect(productionSpy).toHaveBeenCalledTimes(1)
    expect(config).toEqual(productionSpy.mock.results[0].value)

    productionSpy.mockRestore()
  })
})
