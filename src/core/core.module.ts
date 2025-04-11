import { forwardRef, Module } from '@nestjs/common'
import { CoreInfrastructureModule } from '@/core/infrastructure/core-infrastructure.module'
import { CorePresentationModule } from '@/core/presentation/core-presentation.module'
import { SecurityModule } from '@/application/services/securities/security.module'

@Module({
  imports: [forwardRef(() => SecurityModule), CoreInfrastructureModule, CorePresentationModule],
  providers: [],
  exports: [CoreInfrastructureModule, CorePresentationModule],
})
export class CoreModule {}
