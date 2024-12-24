import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

describe('ConfigLoaderService', () => {
  let service: ConfigLoaderService

  beforeEach(() => {
    service = new ConfigLoaderService()
  })

  it('should load production config', () => {
    process.env.NODE_ENV = 'production'
    const config = service.loadConfig()
    expect(config).toHaveProperty('database.host', 'prod-db-host')
  })

  it('should load default config', () => {
    delete process.env.NODE_ENV
    const config = service.loadConfig()
    expect(config).toHaveProperty('database.host', 'localhost')
  })
})
