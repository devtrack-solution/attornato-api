// infrastructure/services/redis-cache.service.ts
import { Injectable, Logger } from '@nestjs/common'

import { RedisClientType, createClient } from 'redis'
import { DistributedCacheService } from '@/domain/distributed-cache-service.interface'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

@Injectable()
export class RedisCacheService implements DistributedCacheService {
  private readonly logger: Logger = new Logger(RedisCacheService.name)
  private client: RedisClientType

  constructor(private readonly configLoaderService: ConfigLoaderService) {
    // this.logger.log('Redis URL: ', `redis://${this.configLoaderService.loadConfig().redis.host}:${this.configLoaderService.loadConfig().redis.port}`)
    this.logger.log('Redis process.env.REDIS_URL: ', process.env.REDIS_URL)
    this.client = createClient({
      url: `redis://${this.configLoaderService.loadConfig().redis.host}:${this.configLoaderService.loadConfig().redis.port}`,
    })

    this.client.on('error', (err: any) => {
      this.logger.error('Redis connection error:', err)
    })

    this.client.connect().then((r) => this.logger.log('Connected to Redis'))
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async set(key: string, value: any): Promise<void> {
    const serializedValue = JSON.stringify(value)
    await this.client.set(key, serializedValue, { EX: this.configLoaderService.loadConfig().redis.ttl as number })
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key)
  }
}
