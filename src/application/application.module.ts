import { Module } from '@nestjs/common'
import { TodoModule } from '@/application/services/todo/todo.module'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { PermissionModule } from '@/application/services/permission/permission.module'
import {GroupProcessModule} from "@/application/services/group-process/group-process.module";
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    TodoModule,
    PermissionModule,
    GroupProcessModule,
  ],
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class ApplicationModule {}
