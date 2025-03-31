import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ApplicationModule } from '@/application/application.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { PermissionHttpControllerModule } from '@/presentation/controllers/http/permission/permission-http-controller.module'
import { GroupProcessHttpControllerModule } from '@/presentation/controllers/http/group-process/group-process-http-controller.module'
import { ResponsibleHttpControllerModule } from './controllers/http/responsible/responsible-http-controller.module'
import { PhaseHttpControllerModule } from './controllers/http/phase/phase-http-controller.module'
import { LocatorHttpControllerModule } from './controllers/http/locator/locator-http-controller.module'
import { PracticeAreaHttpControllerModule } from '@/presentation/controllers/http/practice-area/practice-area-http-controller.module'
import { ActionObjectHttpControllerModule } from '@/presentation/controllers/http/action-object/action-object-http-controller.module'
import { SubjectHttpControllerModule } from '@/presentation/controllers/http/subject/subject-http-controller.module'
import { ProceduralStatusHttpControllerModule } from '@/presentation/controllers/http/procedural-status/procedural-status-http-controller.module'
import { OriginHttpControllerModule } from '@/presentation/controllers/http/origin/origin-http-controller.module'
import { LocalProcedureNameHttpControllerModule } from '@/presentation/controllers/http/local-procedure-name/local-procedure-name-http-controller.module'
import { DetailsHttpControllerModule } from '@/presentation/controllers/http/details/details-http-controller.module'
import { GroupCustomerHttpControllerModule } from '@/presentation/controllers/http/group-customer/group-customer-http-controller.module'
import { ProfileHttpControllerModule } from '@/presentation/controllers/http/profile/profile-http-controller.module'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ApplicationModule,
    ActionObjectHttpControllerModule,
    DetailsHttpControllerModule,
    PermissionHttpControllerModule,
    GroupProcessHttpControllerModule,
    GroupCustomerHttpControllerModule,
    ResponsibleHttpControllerModule,
    PhaseHttpControllerModule,
    LocatorHttpControllerModule,
    PracticeAreaHttpControllerModule,
    SubjectHttpControllerModule,
    ProceduralStatusHttpControllerModule,
    OriginHttpControllerModule,
    ProfileHttpControllerModule,
    LocalProcedureNameHttpControllerModule,
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
