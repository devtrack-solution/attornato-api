import { forwardRef, Global, Module } from '@nestjs/common'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { RedisCacheService } from '@/infrastructure/services/redis-cache.service'
import { IdempotencyMiddleware } from '@/infrastructure/middleware/idempotency.middleware'
import { CoreModule } from '@/core/core.module'

@Global()
@Module({
  imports: [forwardRef(() => CoreModule)],
  providers: [
    ConfigLoaderService,
    {
      provide: 'DistributedCacheService',
      useClass: RedisCacheService,
    },
    IdempotencyMiddleware,
  ],
  exports: [ConfigLoaderService, 'DistributedCacheService', IdempotencyMiddleware],
})
export class InfrastructureModule {}
