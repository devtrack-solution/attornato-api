import { forwardRef, Global, Module } from '@nestjs/common'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'

import { CoreModule } from '@/core/core.module'
import { PrismaTodoRepository } from '@/infrastructure/adapters/database/prisma-todo.repository'
import { RedisCacheAdapter } from '@/infrastructure/adapters/redis/redis-cache.adapter'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'

@Global()
@Module({
  imports: [forwardRef(() => CoreModule)],
  providers: [
    ConfigLoaderService,
    {
      provide: 'DistributedCacheService',
      useClass: RedisCacheAdapter,
    },
    {
      provide: 'TodoRepositoryOutboundPort',
      useClass: PrismaTodoRepository,
    },
    IdempotencyMiddleware,
  ],
  exports: [ConfigLoaderService, IdempotencyMiddleware],
})
export class InfrastructureModule {}
