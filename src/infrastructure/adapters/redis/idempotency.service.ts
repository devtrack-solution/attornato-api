import { Injectable, Inject } from '@nestjs/common'
import { IDistributedCachePort } from '@/domain/distributed-cache-service.interface'

@Injectable()
export class IdempotencyService {
  constructor(
    @Inject('IDistributedCachePort')
    private readonly distributedCache: IDistributedCachePort,
  ) {}

  async getKey(key: string): Promise<string | null> {
    return this.distributedCache.get(key)
  }

  async saveKey(key: string, response: any): Promise<void> {
    await this.distributedCache.set(key, response)
  }
}
