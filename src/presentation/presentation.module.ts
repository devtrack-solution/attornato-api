import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ApplicationModule } from '@/application/application.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { TodoHttpControllerModule } from '@/presentation/controllers/http/todo/todo-http-controller.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { PermissionHttpControllerModule } from '@/presentation/controllers/http/permission/permission-http-controller.module'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ApplicationModule,
    PermissionHttpControllerModule,
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
