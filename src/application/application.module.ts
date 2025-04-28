import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { GroupProcessModule } from '@/application/services/process/group-process/group-process.module'
import { ResponsibleModule } from '@/application/services/process/responsible/responsible.module'
import { PhaseModule } from '@/application/services/process/phase/phase.module'
import { CountyModule } from '@/application/services/process/county/county.module'
import { LocatorModule } from '@/application/services/process/locator/locator.module'
import { PracticeAreaModule } from '@/application/services/process/practice-area/practice-area.module'
import { ActionObjectModule } from '@/application/services/process/action-object/action-object.module'
import { SubjectModule } from '@/application/services/process/subject/subject.module'
import { ProceduralStatusModule } from '@/application/services/process/procedural-status/procedural-status.module'
import { DetailsModule } from '@/application/services/process/details/details.module'
import { OriginModule } from '@/application/services/process/origin/origin.module'
import { LocalProcedureNameModule } from '@/application/services/process/local-procedure-name/local-procedure-name.module'
import { PrognosisModule } from '@/application/services/process/prognosis/prognosis.module'
import { PartnerModule } from '@/application/services/process/partner/partner.module'
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
