import { Module } from '@nestjs/common'
import { ActionObjectModule } from '@/application/services/process/action-object/action-object.module'
import { CountyModule } from '@/application/services/process/county/county.module'
import { ClientModule } from '@/application/services/client/client.module'
import { DetailsModule } from '@/application/services/process/details/details.module'
import { GroupProcessModule } from '@/application/services/process/group-process/group-process.module'
import {
  LocalProcedureNameModule
} from '@/application/services/process/local-procedure-name/local-procedure-name.module'
import { LocatorModule } from '@/application/services/process/locator/locator.module'
import { OriginModule } from '@/application/services/process/origin/origin.module'
import { PartnerModule } from '@/application/services/process/partner/partner.module'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { PhaseModule } from '@/application/services/process/phase/phase.module'
import { PracticeAreaModule } from '@/application/services/process/practice-area/practice-area.module'
import { ProceduralStatusModule } from '@/application/services/process/procedural-status/procedural-status.module'
import { PrognosisModule } from '@/application/services/process/prognosis/prognosis.module'
import { ResponsibleModule } from '@/application/services/process/responsible/responsible.module'
import { SubjectModule } from '@/application/services/process/subject/subject.module'

@Module({
  imports: [
    ActionObjectModule,
    CountyModule,
    DetailsModule,
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
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProcessModule {}
