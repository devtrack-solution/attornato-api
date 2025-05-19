import { Module } from '@nestjs/common'
import { ActionObjectHttpControllerModule } from '@/presentation/controllers/http/process/component/action-object/action-object-http-controller.module'
import { CountyHttpControllerModule } from '@/presentation/controllers/http/process/component/county/county-http-controller.module'
import { DetailHttpControllerModule } from '@/presentation/controllers/http/process/component/detail/detail-http-controller.module'
import { GroupProcessHttpControllerModule } from '@/presentation/controllers/http/process/component/group-process/group-process-http-controller.module'
import { LocalProcedureNameHttpControllerModule } from '@/presentation/controllers/http/process/component/local-procedure-name/local-procedure-name-http-controller.module'
import { LocatorHttpControllerModule } from '@/presentation/controllers/http/process/component/locator/locator-http-controller.module'
import { OriginHttpControllerModule } from '@/presentation/controllers/http/process/component/origin/origin-http-controller.module'
import { PartnerHttpControllerModule } from '@/presentation/controllers/http/process/component/partner/partner-http-controller.module'
import { PhaseHttpControllerModule } from '@/presentation/controllers/http/process/component/phase/phase-http-controller.module'
import { PracticeAreaHttpControllerModule } from '@/presentation/controllers/http/process/component/practice-area/practice-area-http-controller.module'
import { ProceduralStatusHttpControllerModule } from '@/presentation/controllers/http/process/component/procedural-status/procedural-status-http-controller.module'
import { PrognosisHttpControllerModule } from '@/presentation/controllers/http/process/component/prognosis/prognosis-http-controller.module'
import { ResponsibleHttpControllerModule } from '@/presentation/controllers/http/process/component/responsible/responsible-http-controller.module'
import { SubjectHttpControllerModule } from '@/presentation/controllers/http/process/component/subject/subject-http-controller.module'
import { JudicialHttpControllerModule } from '@/presentation/controllers/http/process/component/judicial/judicial-http-controller.module'
import { ProcessHttpControllerModule } from '@/presentation/controllers/http/process/process-http-controller.module'
import { AdministrativeHttpController } from '@/presentation/controllers/http/process/component/administrative/administrative-http.controller'
import { AdministrativeHttpControllerModule } from '@/presentation/controllers/http/process/component/administrative/administrative-http-controller.module'
import {
  FreeField1HttpControllerModule
} from '@/presentation/controllers/http/process/component/process-detail/component/free-field-1/free-field-1-http-controller.module'
import {
  FreeField2HttpControllerModule
} from '@/presentation/controllers/http/process/component/process-detail/component/free-field-2/free-field-2-http-controller.module'
import {
  FreeField6HttpControllerModule
} from '@/presentation/controllers/http/process/component/process-detail/component/free-field-6/free-field-6-http-controller.module'

@Module({
  imports: [
    ProcessHttpControllerModule,
    ActionObjectHttpControllerModule,
    CountyHttpControllerModule,
    DetailHttpControllerModule,
    FreeField1HttpControllerModule,
    FreeField2HttpControllerModule,
    FreeField6HttpControllerModule,
    GroupProcessHttpControllerModule,
    JudicialHttpControllerModule,
    AdministrativeHttpControllerModule,
    LocalProcedureNameHttpControllerModule,
    LocatorHttpControllerModule,
    OriginHttpControllerModule,
    PartnerHttpControllerModule,
    PhaseHttpControllerModule,
    PracticeAreaHttpControllerModule,
    ProceduralStatusHttpControllerModule,
    PrognosisHttpControllerModule,
    ResponsibleHttpControllerModule,
    SubjectHttpControllerModule,
  ],
  controllers: [],
  exports: [],
})
export class ProcessOrganizeControllerModule {}
