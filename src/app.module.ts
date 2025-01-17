import { Global, Module } from '@nestjs/common'
import { PresentationModule } from '@/presentation/presentation.module'
import { ApplicationModule } from '@/application/application.module'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'

@Global()
@Module({
  imports: [ApplicationModule, InfrastructureModule, PresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
