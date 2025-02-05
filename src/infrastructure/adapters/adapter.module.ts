import { Module } from '@nestjs/common'
import { DistributedCachePortSymbol } from '@/application/ports/distributed-cache.port'
import { RedisCacheAdapter } from '@/infrastructure/adapters/redis/redis-cache.adapter'

import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { ThrottlerGuard } from '@nestjs/throttler'
import { ConfigModule } from '@/infrastructure/config/config.module'
import { PGSQLModule } from '@/infrastructure/adapters/pgsql/pgsql.module'

@Module({
  imports: [ConfigModule, PGSQLModule],
  providers: [
    {
      provide: DistributedCachePortSymbol,
      useClass: RedisCacheAdapter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencySaveInterceptor,
    },
    IdempotencyService,
    IdempotencyMiddleware,
  ],
  exports: [DistributedCachePortSymbol, IdempotencyService, IdempotencyMiddleware],
})
export class AdapterModule {}
