import { Injectable, Inject } from '@nestjs/common'
<<<<<<< Updated upstream:src/core/services/idempotency.service.ts
import { DistributedCacheService } from '@/application/domain/ports/distributed-cache.port'
=======
import { DistributedCacheService } from '@/domain/distributed-cache-service.interface'
>>>>>>> Stashed changes:src/infrastructure/services/idempotency.service.ts

@Injectable()
export class IdempotencyService {
  constructor(
    @Inject('DistributedCacheService')
    private readonly distributedCache: DistributedCacheService,
  ) {}

  async getKey(key: string): Promise<string | null> {
    return this.distributedCache.get(key)
  }

  async saveKey(key: string, response: any): Promise<void> {
    await this.distributedCache.set(key, response)
  }
}
