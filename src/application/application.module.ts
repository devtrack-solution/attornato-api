import { Module } from '@nestjs/common'
import { TodoModule } from '@/application/services/todo/todo.module'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'

@Module({
  imports: [TodoModule],
  providers: [IdempotencyService],
  controllers: [],
  exports: [IdempotencyService],
})
export class ApplicationModule {}
