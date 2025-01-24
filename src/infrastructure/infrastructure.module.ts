import { Global, Module } from '@nestjs/common'
import { AdapterModule } from '@/infrastructure/adapters/adapter.module'
import { registerBindingsDynamically } from '@/infrastructure/decorators/bind.decorator'

@Global()
@Module({
  imports: [AdapterModule, registerBindingsDynamically()],
  providers: [],
  exports: [AdapterModule],
})
export class InfrastructureModule {}
