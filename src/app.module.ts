import { Global, Module } from '@nestjs/common'
import { PresentationModule } from '@/presentation/presentation.module'
import { ApplicationModule } from '@/application/application.module'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Global()
@Module({
  imports: [EventEmitterModule.forRoot(), ApplicationModule, InfrastructureModule.forRoot(), PresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
