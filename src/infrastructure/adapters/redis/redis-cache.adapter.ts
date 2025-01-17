import { Injectable, Logger } from '@nestjs/common'
import { RedisClientType, createClient } from 'redis'

import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { IDistributedCachePort } from '@/domain/distributed-cache-service.interface'

@Injectable()
export class RedisCacheAdapter implements IDistributedCachePort {
  private readonly logger: Logger = new Logger(RedisCacheAdapter.name)
  private client: RedisClientType

  constructor(private readonly configLoaderService: ConfigLoaderService) {
    this.logger.debug(`Redis process.env.REDIS_URL: redis://${this.configLoaderService.loadConfig().redis.host}:${this.configLoaderService.loadConfig().redis.port}`)
    this.logger.debug(`Redis process.env.REDIS_HOST: ${this.configLoaderService.loadConfig().redis.host}`)
    this.logger.debug(`Redis process.env.REDIS_PORT: ${this.configLoaderService.loadConfig().redis.port}`)
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
