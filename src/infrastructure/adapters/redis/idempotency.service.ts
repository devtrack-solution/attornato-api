import { Injectable, Inject } from '@nestjs/common'

import { DistributedCachePortSymbol, IDistributedCachePort } from '@/application/ports/distributed-cache.port'

@Injectable()
export class IdempotencyService {
  constructor(
    @Inject(DistributedCachePortSymbol)
    private readonly distributedCache: IDistributedCachePort,
  ) {}

  async getKey(key: string): Promise<string | null> {
    return this.distributedCache.get(key)
  }

  async saveKey(key: string, response: any): Promise<void> {
    await this.distributedCache.set(key, response)
  }
}
