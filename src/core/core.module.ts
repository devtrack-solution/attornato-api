import { forwardRef, Module } from '@nestjs/common'
import { IdempotencyService } from '../infrastructure/services/idempotency.service'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [IdempotencyService],
  exports: [IdempotencyService],
})
export class CoreModule {}
