import { Module } from '@nestjs/common'
import { TodoModule } from '@/application/services/todo.module'
import { TodoHttpControllerModule } from '@/presentation/controllers/http/todo/todo-http-controller.module'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'

@Module({
  imports: [TodoModule],
  providers: [IdempotencyService],
  controllers: [],
  exports: [IdempotencyService],
})
export class ApplicationModule {}
