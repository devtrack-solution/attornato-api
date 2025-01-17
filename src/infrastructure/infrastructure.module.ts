import { Global, Module } from '@nestjs/common'
import { AdapterModule } from '@/infrastructure/adapters/adapter.module'

@Global()
@Module({
  imports: [AdapterModule],
  providers: [],
  exports: [AdapterModule],
})
export class InfrastructureModule {}
