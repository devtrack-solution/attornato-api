import { Module } from '@nestjs/common'
import { ActionObjectHttpControllerModule } from '@/presentation/controllers/http/process/action-object/action-object-http-controller.module'
import { CountyHttpControllerModule } from '@/presentation/controllers/http/process/county/county-http-controller.module'
import { DetailsHttpControllerModule } from '@/presentation/controllers/http/process/details/details-http-controller.module'
import { GroupProcessHttpControllerModule } from '@/presentation/controllers/http/process/group-process/group-process-http-controller.module'
import { LocalProcedureNameHttpControllerModule } from '@/presentation/controllers/http/process/local-procedure-name/local-procedure-name-http-controller.module'
import { LocatorHttpControllerModule } from '@/presentation/controllers/http/process/locator/locator-http-controller.module'
import { OriginHttpControllerModule } from '@/presentation/controllers/http/process/origin/origin-http-controller.module'
import { PartnerHttpControllerModule } from '@/presentation/controllers/http/process/partner/partner-http-controller.module'
import { PhaseHttpControllerModule } from '@/presentation/controllers/http/process/phase/phase-http-controller.module'
import { PracticeAreaHttpControllerModule } from '@/presentation/controllers/http/process/practice-area/practice-area-http-controller.module'
import { ProceduralStatusHttpControllerModule } from '@/presentation/controllers/http/process/procedural-status/procedural-status-http-controller.module'
import { PrognosisHttpControllerModule } from '@/presentation/controllers/http/process/prognosis/prognosis-http-controller.module'
import { ResponsibleHttpControllerModule } from '@/presentation/controllers/http/process/responsible/responsible-http-controller.module'
import { SubjectHttpControllerModule } from '@/presentation/controllers/http/process/subject/subject-http-controller.module'

@Module({
  imports: [
    ActionObjectHttpControllerModule,
    CountyHttpControllerModule,
    DetailsHttpControllerModule,
    GroupProcessHttpControllerModule,
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
export class ProcessHttpControllerModule {}
