import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ApplicationModule } from '@/application/application.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { PermissionHttpControllerModule } from '@/presentation/controllers/http/permission/permission-http-controller.module'
import { AuthModule } from '@/infrastructure/adapters/http/auth.module'
import { ClientOrganizeControllerModule } from '@/presentation/controllers/http/client/client-organize-controller.module'
import { ProcessOrganizeControllerModule } from '@/presentation/controllers/http/process/process-organize-controller.module'
import { AccountOrganizeControllerModule } from '@/presentation/controllers/http/account/account-organize-controller.module'

@Module({
  imports: [
    ThrottlerModule.forRoot(),
    ApplicationModule,
    AccountOrganizeControllerModule,
    ClientOrganizeControllerModule,
    ProcessOrganizeControllerModule,
    PermissionHttpControllerModule,
    AuthModule
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
  controllers: [], // Liste os controladores necessários
  exports: [ApplicationModule], // Apenas exporte o que outra parte da aplicação realmente precisa
})
export class PresentationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdempotencyMiddleware)
      .exclude(
        { path: '/docs(.*)', method: RequestMethod.ALL },
        {
          path: '*',
          method: RequestMethod.OPTIONS,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
