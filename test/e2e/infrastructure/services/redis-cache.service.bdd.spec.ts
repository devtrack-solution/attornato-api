import { RedisCacheService } from '@/infrastructure/services/redis-cache.service'
import { createClient } from 'redis-mock'
import { AppConfig } from '@/domain/app-config.interface'

describe('RedisCacheService - Behavior-Driven', () => {
  let redisCacheService: RedisCacheService
  let mockClient: any
  let config: AppConfig

  beforeEach(() => {
    mockClient = createClient() // Mock Redis client
    jest.spyOn(mockClient, 'connect').mockImplementation(async () => {})
    jest.spyOn(mockClient, 'disconnect').mockImplementation(async () => {})
    redisCacheService = new RedisCacheService(mockClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should save a value in the cache with a TTL', async () => {
    const key = 'test-key'
    const value = { data: 'test-value' }
    const ttl = 600

    jest.spyOn(mockClient, 'set').mockResolvedValue('OK')

    await redisCacheService.set(key, value)

    expect(mockClient.set).toHaveBeenCalledWith(key, JSON.stringify(value), expect.objectContaining({ EX: ttl }))
  })

  it('should retrieve a value from the cache', async () => {
    const key = 'test-key'
    const value = JSON.stringify({ data: 'test-value' })

    jest.spyOn(mockClient, 'get').mockResolvedValue(value)

    const result = await redisCacheService.get(key)

    expect(mockClient.get).toHaveBeenCalledWith(key)
    expect(result).toEqual(JSON.parse(value))
  })

  it('should delete a value from the cache', async () => {
    const key = 'test-key'

    jest.spyOn(mockClient, 'del').mockResolvedValue(1)

    await redisCacheService.delete(key)

    expect(mockClient.del).toHaveBeenCalledWith(key)
  })
})
