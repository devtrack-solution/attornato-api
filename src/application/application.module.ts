import { Module } from '@nestjs/common'
import { TodoModule } from '@/application/services/todo/todo.module'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
import { EventEmitterModule } from '@nestjs/event-emitter'
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      maxListeners: 20,
    }),
    TodoModule,
  ],
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class ApplicationModule {}
