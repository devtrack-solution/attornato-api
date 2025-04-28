import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import { GroupProcessModule } from '@/application/services/group-process/group-process.module'
import { ResponsibleModule } from './services/responsible/responsible.module'
import { PhaseModule } from './services/phase/phase.module'
import { CountyModule } from './services/county/county.module'
import { LocatorModule } from './services/locator/locator.module'
import { PracticeAreaModule } from '@/application/services/practice-area/practice-area.module'
import { ActionObjectModule } from '@/application/services/action-object/action-object.module'
import { SubjectModule } from '@/application/services/subject/subject.module'
import { ProceduralStatusModule } from '@/application/services/procedural-status/procedural-status.module'
import { DetailsModule } from '@/application/services/details/details.module'
import { OriginModule } from '@/application/services/origin/origin.module'
import { LocalProcedureNameModule } from '@/application/services/local-procedure-name/local-procedure-name.module'
import { PrognosisModule } from '@/application/services/prognosis/prognosis.module'
import { PartnerModule } from '@/application/services/partner/partner.module'
import { ClientModule } from '@/application/services/client/client.module'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    ActionObjectModule,
    CountyModule,
    ClientModule,
    DetailsModule,
    GroupProcessModule,
    LocalProcedureNameModule,
    LocatorModule,
    OriginModule,
    PartnerModule,
    PermissionModule,
    PhaseModule,
    PracticeAreaModule,
    ProceduralStatusModule,
    PrognosisModule,
    ResponsibleModule,
    SubjectModule,
  ],
  providers: [],
  exports: [],
})
export class ApplicationModule {}
