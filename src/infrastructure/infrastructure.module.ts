import { forwardRef, Global, Module } from '@nestjs/common'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
<<<<<<< Updated upstream
import { RedisCacheAdapter } from '@/infrastructure/adapters/redis/redis-cache.adapter'
import { IdempotencyMiddleware } from '@/infrastructure/middleware/idempotency.middleware'
=======
import { RedisCacheService } from '@/infrastructure/services/redis-cache.service'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
>>>>>>> Stashed changes
import { CoreModule } from '@/core/core.module'
import { PrismaTodoRepository } from '@/infrastructure/adapters/database/prisma-todo.repository'

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
  exports: [ConfigLoaderService, 'DistributedCacheService', IdempotencyMiddleware],
})
export class InfrastructureModule {}
