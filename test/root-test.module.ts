import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service' // Certifique-se do caminho correto
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { CoreModule } from '@/core/core.module'

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigLoaderService],
      useFactory: (configService: ConfigLoaderService) => ({
        throttlers: [
          {
            ttl: (configService.loadConfig().throttling.ttl as number) || 60,
            limit: (configService.loadConfig().throttling.limit as number) || 10,
          },
        ],
      }),
    }),
    InfrastructureModule,
    CoreModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencySaveInterceptor,
    },
  ],
  exports: [],
})
export class RootTestModule {}
