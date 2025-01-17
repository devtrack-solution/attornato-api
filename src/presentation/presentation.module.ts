import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ApplicationModule } from '@/application/application.module'
import { ConfigModule } from '@/infrastructure/config/config.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ConfigLoaderService } from '@/infrastructure/config/config-loader.service'
import { TodoHttpControllerModule } from '@/presentation/controllers/http/todo/todo-http-controller.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { ConfigPortSymbol } from '@/application/ports/config.port'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ApplicationModule,
    TodoHttpControllerModule,
  ],
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
  controllers: [],
  exports: [],
})
export class PresentationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdempotencyMiddleware).exclude({ path: '/docs(.*)', method: RequestMethod.ALL }).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
