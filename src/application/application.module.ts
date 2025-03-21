import { Module } from '@nestjs/common'
import { TodoModule } from '@/application/services/todo/todo.module'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import {GroupProcessModule} from "@/application/services/group-process/group-process.module";
import { ResponsibleModule } from './services/responsible/responsible.module'
import { PhaseModule } from './services/phase/phase.module'
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    TodoModule,
    PermissionModule,
    GroupProcessModule,
    ResponsibleModule,
    PhaseModule
  ],
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class ApplicationModule {}
