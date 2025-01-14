import { RedisCacheService } from '@/infrastructure/services/redis-cache.service'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

describe('RedisCacheService - Test-Driven', () => {
  let redisCacheService: RedisCacheService
  let mockClient: any
  let mockConfigLoaderService: ConfigLoaderService

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    mockConfigLoaderService = {
      loadConfig: jest.fn().mockReturnValue({
        redis: {
          host: 'localhost',
          port: 6379,
          ttl: 300,
        },
      }),
    } as unknown as ConfigLoaderService

    mockClient = {
      connect: jest.fn().mockResolvedValue(undefined),
      disconnect: jest.fn().mockResolvedValue(undefined),
      set: jest.fn().mockResolvedValue('OK'),
      get: jest.fn().mockResolvedValue(null),
      del: jest.fn().mockResolvedValue(0),
      on: jest.fn(),
    }

    redisCacheService = new RedisCacheService(mockConfigLoaderService)
    ;(redisCacheService as any).client = mockClient
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should save a key-value pair with a TTL', async () => {
    const key = 'test-key'
    const value = { data: 'test-value' }

    await redisCacheService.set(key, value)

    expect(mockClient.set).toHaveBeenCalledWith(key, JSON.stringify(value), expect.objectContaining({ EX: 300 }))
  })

  it('should retrieve a value from the cache', async () => {
    const key = 'test-key'
    const value = JSON.stringify({ data: 'test-value' })

    jest.spyOn(mockClient, 'get').mockResolvedValue(value)

    const result = await redisCacheService.get(key)

    expect(mockClient.get).toHaveBeenCalledWith(key)
    expect(result).toEqual(value)
  })

  it('should delete a value from the cache', async () => {
    const key = 'test-key'

    await redisCacheService.delete(key)

    expect(mockClient.del).toHaveBeenCalledWith(key)
  })
})
