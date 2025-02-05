import { Injectable, Logger } from '@nestjs/common'
import { RedisClientType, createClient } from 'redis'

import { IDistributedCachePort } from '@/application/ports/distributed-cache.port'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Injectable()
export class RedisCacheAdapter implements IDistributedCachePort {
  private readonly logger: Logger = new Logger(RedisCacheAdapter.name)
  private client: RedisClientType

  constructor(private readonly environmentService: ConfigEnvironmentService) {
    this.logger.debug(`Redis process.env.REDIS_URL: redis://${this.environmentService.redis?.host}:${this.environmentService.redis?.port}`)
    this.logger.debug(`Redis process.env.REDIS_HOST: ${this.environmentService.redis?.host}`)
    this.logger.debug(`Redis process.env.REDIS_PORT: ${this.environmentService.redis?.port}`)
    this.client = createClient({
      url: `redis://${this.environmentService.redis?.host}:${this.environmentService.redis?.port}`,
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
    await this.client.set(key, serializedValue, { EX: this.environmentService.redis.ttl as number })
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key)
  }
}
