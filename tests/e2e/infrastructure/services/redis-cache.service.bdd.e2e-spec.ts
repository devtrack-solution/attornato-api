import { RedisCacheAdapter } from '@/infrastructure/adapters/redis/redis-cache.adapter'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

describe('RedisCacheAdapter - Behavior-Driven', () => {
  let redisCacheService: RedisCacheAdapter
  let mockClient: any
  let mockConfigEnvironmentService: any

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})

    mockConfigEnvironmentService = new ConfigEnvironmentService()

    mockClient = {
      connect: jest.fn().mockResolvedValue(undefined),
      disconnect: jest.fn().mockResolvedValue(undefined),
      set: jest.fn().mockResolvedValue('OK'),
      get: jest.fn().mockResolvedValue(null),
      del: jest.fn().mockResolvedValue(0),
      on: jest.fn(),
    }

    redisCacheService = new RedisCacheAdapter(mockConfigEnvironmentService)
    ;(redisCacheService as any).client = mockClient
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should save a value in the cache with a TTL', async () => {
    const key = 'test-key'
    const value = { data: 'test-value' }

    await redisCacheService.set(key, value)

    expect(mockClient.set).toHaveBeenCalledWith(key, JSON.stringify(value), expect.objectContaining({ EX: 60 }))
  })

  it('should retrieve a value from the cache', async () => {
    const key = 'test-key'
    const value = JSON.stringify({ data: 'test-value' })

    mockClient.get.mockResolvedValue(value)

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
