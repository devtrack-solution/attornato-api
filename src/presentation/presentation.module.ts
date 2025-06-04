import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ApplicationModule } from '@/application/application.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { PermissionHttpControllerModule } from '@/presentation/controllers/http/permission/permission-http-controller.module'
import { AuthModule } from '@/infrastructure/adapters/http/auth.module'
import { ClientOrganizeControllerModule } from '@/presentation/controllers/http/client/client-organize-controller.module'
import { ProcessOrganizeControllerModule } from '@/presentation/controllers/http/process/process-organize-controller.module'
import { AccountOrganizeControllerModule } from '@/presentation/controllers/http/account/account-organize-controller.module'
import { AuthHttpControllerModule } from '@/presentation/controllers/http/securities/auth/auth-http-controller.module'
import { RoleHttpControllerModule } from '@/presentation/controllers/http/role/role-http-controller.module'
import { HttpProxyInterceptorMiddleware } from '@/infrastructure/middlewares/http-proxy-interceptor/http-proxy-interceptor.middleware'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'

@Module({
  imports: [
    InfrastructureModule,
    ThrottlerModule.forRoot(),
    ApplicationModule,
    AuthHttpControllerModule,
    AccountOrganizeControllerModule,
    ClientOrganizeControllerModule,
    ProcessOrganizeControllerModule,
    PermissionHttpControllerModule,
    RoleHttpControllerModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [ApplicationModule],
})
export class PresentationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpProxyInterceptorMiddleware)
      .exclude(
        { path: '/docs(.*)', method: RequestMethod.ALL },
        { path: '*', method: RequestMethod.OPTIONS },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
