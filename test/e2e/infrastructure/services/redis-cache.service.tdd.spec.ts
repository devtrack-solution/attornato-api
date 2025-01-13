import { RedisCacheService } from '@/infrastructure/services/redis-cache.service'
import { createClient } from 'redis-mock'

describe('RedisCacheService - Test-Driven', () => {
  let redisCacheService: RedisCacheService
  let mockClient: any

  beforeEach(() => {
    mockClient = createClient() // Mock Redis client
    jest.spyOn(mockClient, 'connect').mockImplementation(async () => {})
    redisCacheService = new RedisCacheService(mockClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('set method', () => {
    it('should save a key-value pair with a TTL', async () => {
      const key = 'key'
      const value = { message: 'value' }
      const ttl = 300

      jest.spyOn(mockClient, 'set').mockResolvedValue('OK')

      await redisCacheService.set(key, value)

      expect(mockClient.set).toHaveBeenCalledWith(key, JSON.stringify(value), expect.objectContaining({ EX: ttl }))
    })
  })

  describe('get method', () => {
    it('should return null if the key does not exist', async () => {
      const key = 'nonexistent-key'

      jest.spyOn(mockClient, 'get').mockResolvedValue(null)

      const result = await redisCacheService.get(key)

      expect(mockClient.get).toHaveBeenCalledWith(key)
      expect(result).toBeNull()
    })

    it('should return the value if the key exists', async () => {
      const key = 'existing-key'
      const value = JSON.stringify({ data: 'value' })

      jest.spyOn(mockClient, 'get').mockResolvedValue(value)

      const result = await redisCacheService.get(key)

      expect(mockClient.get).toHaveBeenCalledWith(key)
      expect(result).toEqual(JSON.parse(value))
    })
  })

  describe('delete method', () => {
    it('should remove the key from the cache', async () => {
      const key = 'key-to-delete'

      jest.spyOn(mockClient, 'del').mockResolvedValue(1)

      await redisCacheService.delete(key)

      expect(mockClient.del).toHaveBeenCalledWith(key)
    })

    it('should not throw an error if the key does not exist', async () => {
      const key = 'nonexistent-key'

      jest.spyOn(mockClient, 'del').mockResolvedValue(0)

      await expect(redisCacheService.delete(key)).resolves.not.toThrow()

      expect(mockClient.del).toHaveBeenCalledWith(key)
    })
  })
})
