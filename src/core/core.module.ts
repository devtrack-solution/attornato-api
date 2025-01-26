import { forwardRef, Module } from '@nestjs/common'
import { IdempotencyService } from '@/infrastructure/adapters/redis/idempotency.service'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'

@Module({
  imports: [forwardRef(() => InfrastructureModule.forRoot())],
  providers: [],
  exports: [],
})
export class CoreModule {}
