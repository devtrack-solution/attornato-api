import { Module } from '@nestjs/common'
import { AdapterModule } from '@/infrastructure/adapters/adapter.module'

@Module({
  imports: [AdapterModule],
  exports: [AdapterModule],
})
export class InfrastructureModule {}
