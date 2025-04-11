import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { RedisClientType, createClient } from 'redis'

import { IDistributedCachePort } from '@/application/ports/distributed-cache.port'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'

@Injectable()
export class RedisCacheAdapter implements IDistributedCachePort, OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(RedisCacheAdapter.name)
  private client: RedisClientType

  constructor(private readonly environmentService: ConfigEnvironmentService) {
    this.client = createClient({
      url: `redis://${this.environmentService.redis?.host}:${this.environmentService.redis?.port}`,
    })

    this.client.on('error', (err: any) => {
      this.logger.error('Redis connection error:', err)
    })
  }

  async onModuleInit() {
    this.logger.debug(`Connecting to Redis at redis://${this.environmentService.redis?.host}:${this.environmentService.redis?.port}`)
    await this.client.connect()
    this.logger.log('Connected to Redis')
  }

  async onModuleDestroy() {
    await this.disconnect()
  }

  async disconnect(): Promise<void> {
    if (this.client && this.client.isOpen) {
      await this.client.quit()
      this.logger.log('Disconnected from Redis')
    }
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
