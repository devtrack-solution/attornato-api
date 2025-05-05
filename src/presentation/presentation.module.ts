import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ApplicationModule } from '@/application/application.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { IdempotencyMiddleware } from '@/presentation/middlewares/idempotency.middleware'
import { IdempotencySaveInterceptor } from '@/presentation/iterceptors/idempotency-save.interceptor'
import { PermissionHttpControllerModule } from '@/presentation/controllers/http/permission/permission-http-controller.module'
import { GroupProcessHttpControllerModule } from '@/presentation/controllers/http/process/component/group-process/group-process-http-controller.module'
import { ResponsibleHttpControllerModule } from '@/presentation/controllers/http/process/component/responsible/responsible-http-controller.module'
import { PhaseHttpControllerModule } from '@/presentation/controllers/http/process/component/phase/phase-http-controller.module'
import { LocatorHttpControllerModule } from '@/presentation/controllers/http/process/component/locator/locator-http-controller.module'
import { PracticeAreaHttpControllerModule } from '@/presentation/controllers/http/process/component/practice-area/practice-area-http-controller.module'
import { ActionObjectHttpControllerModule } from '@/presentation/controllers/http/process/component/action-object/action-object-http-controller.module'
import { SubjectHttpControllerModule } from '@/presentation/controllers/http/process/component/subject/subject-http-controller.module'
import { ProceduralStatusHttpControllerModule } from '@/presentation/controllers/http/process/component/procedural-status/procedural-status-http-controller.module'
import { OriginHttpControllerModule } from '@/presentation/controllers/http/process/component/origin/origin-http-controller.module'
import { LocalProcedureNameHttpControllerModule } from '@/presentation/controllers/http/process/component/local-procedure-name/local-procedure-name-http-controller.module'
import { DetailHttpControllerModule } from '@/presentation/controllers/http/process/component/detail/detail-http-controller.module'
import { PrognosisHttpControllerModule } from '@/presentation/controllers/http/process/component/prognosis/prognosis-http-controller.module'
import { CountyHttpControllerModule } from '@/presentation/controllers/http/process/component/county/county-http-controller.module'
import { PartnerHttpControllerModule } from '@/presentation/controllers/http/process/component/partner/partner-http-controller.module'
import { AuthModule } from '@/infrastructure/adapters/http/auth.module'
import { IdentifierHttpControllerModule } from '@/presentation/controllers/http/client/component/identifier/identifier-http-controller.module'
import { ClientHttpControllerModule } from '@/presentation/controllers/http/client/client-http-controller.module'
import { ProcessHttpControllerModule } from '@/presentation/controllers/http/process/process-http-controller.module'

@Module({
  imports: [
    ThrottlerModule.forRoot(),
    ApplicationModule,
    ClientHttpControllerModule,
    PermissionHttpControllerModule,
    ProcessHttpControllerModule,
    AuthModule,
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
