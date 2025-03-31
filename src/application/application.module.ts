import { Module } from '@nestjs/common'
import { TodoModule } from '@/application/services/todo/todo.module'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
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
import { FreeFieldModule } from '@/application/services/free-field/free-field.module'
import { DetailsModule } from '@/application/services/details/details.module'
import { OriginModule } from '@/application/services/origin/origin.module'
import { LocalProcedureNameModule } from '@/application/services/local-procedure-name/local-procedure-name.module'
import { GroupCustomerModule } from '@/application/services/group-customer/group-customer.module'
import { ContactTypeModule } from '@/application/services/contact-type/contact-type.module'

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    TodoModule,
    ContactTypeModule,
    PermissionModule,
    GroupProcessModule,
    GroupCustomerModule,
    ResponsibleModule,
    CountyModule,
    PhaseModule,
    LocatorModule,
    PracticeAreaModule,
    ActionObjectModule,
    SubjectModule,
    ProceduralStatusModule,
    FreeFieldModule,
    DetailsModule,
    OriginModule,
    LocalProcedureNameModule,
  ],
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class ApplicationModule {}
