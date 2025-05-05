import { Module } from '@nestjs/common'
import { ActionObjectModule } from '@/application/services/process/component/action-object/action-object.module'
import { CountyModule } from '@/application/services/process/component/county/county.module'
import { DetailModule } from '@/application/services/process/component/detail/detail.module'
import { GroupProcessModule } from '@/application/services/process/component/group-process/group-process.module'
import { LocalProcedureNameModule } from '@/application/services/process/component/local-procedure-name/local-procedure-name.module'
import { LocatorModule } from '@/application/services/process/component/locator/locator.module'
import { OriginModule } from '@/application/services/process/component/origin/origin.module'
import { PartnerModule } from '@/application/services/process/component/partner/partner.module'
import { PhaseModule } from '@/application/services/process/component/phase/phase.module'
import { PracticeAreaModule } from '@/application/services/process/component/practice-area/practice-area.module'
import { ProceduralStatusModule } from '@/application/services/process/component/procedural-status/procedural-status.module'
import { PrognosisModule } from '@/application/services/process/component/prognosis/prognosis.module'
import { ResponsibleModule } from '@/application/services/process/component/responsible/responsible.module'
import { SubjectModule } from '@/application/services/process/component/subject/subject.module'
import { JudicialModule } from '@/application/services/process/component/judicial/judicial.module'
import { ProcessModule } from '@/application/services/process/process.module'
import { AdministrativeModule } from '@/application/services/process/component/administrative/administrative.module'

@Module({
  imports: [
    ProcessModule,
    ActionObjectModule,
    CountyModule,
    DetailModule,
    GroupProcessModule,
    LocalProcedureNameModule,
    LocatorModule,
    OriginModule,
    PartnerModule,
    PhaseModule,
    PracticeAreaModule,
    ProceduralStatusModule,
    PrognosisModule,
    ResponsibleModule,
    SubjectModule,
    JudicialModule,
    AdministrativeModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProcessOrganizeModule {}
