import { Global, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { IdempotencyMiddleware } from '@/infrastructure/middleware/idempotency.middleware'
import { CoreModule } from '@/core/core.module'
import { IdempotencySaveInterceptor } from '@/infrastructure/iterceptors/idempotency-save.interceptor'

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
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencySaveInterceptor,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdempotencyMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
