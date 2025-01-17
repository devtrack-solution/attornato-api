import { Global, MiddlewareConsumer, Module } from '@nestjs/common'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { CoreModule } from '@/core/core.module'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ApplicationModule } from '@/application/application.module'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { PresentationModule } from '@/presentation/presentation.module'

@Global()
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigLoaderService],
      useFactory: (configService: ConfigLoaderService) => ({
        throttlers: [
          {
            ttl: configService.loadConfig().throttling.ttl as number,
            limit: configService.loadConfig().throttling.limit as number,
          },
        ],
      }),
    }),
    InfrastructureModule,
    PresentationModule,
    CoreModule,
    ApplicationModule,
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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(IdempotencyMiddleware).forRoutes({ path: '/', method: RequestMethod.ALL })
  }
}
