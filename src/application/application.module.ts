import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { GroupProcessModule } from '@/application/services/process/component/group-process/group-process.module'
import { ResponsibleModule } from '@/application/services/process/component/responsible/responsible.module'
import { PhaseModule } from '@/application/services/process/component/phase/phase.module'
import { CountyModule } from '@/application/services/process/component/county/county.module'
import { LocatorModule } from '@/application/services/process/component/locator/locator.module'
import { PracticeAreaModule } from '@/application/services/process/component/practice-area/practice-area.module'
import { ActionObjectModule } from '@/application/services/process/component/action-object/action-object.module'
import { SubjectModule } from '@/application/services/process/component/subject/subject.module'
import { ProceduralStatusModule } from '@/application/services/process/component/procedural-status/procedural-status.module'
import { DetailModule } from '@/application/services/process/component/detail/detail.module'
import { OriginModule } from '@/application/services/process/component/origin/origin.module'
import { LocalProcedureNameModule } from '@/application/services/process/component/local-procedure-name/local-procedure-name.module'
import { PrognosisModule } from '@/application/services/process/component/prognosis/prognosis.module'
import { PartnerModule } from '@/application/services/process/component/partner/partner.module'
import { ClientModule } from '@/application/services/client/client.module'
import { ProcessModule } from '@/application/services/process/process.module'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    ClientModule,
    PermissionModule,
    ProcessModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
