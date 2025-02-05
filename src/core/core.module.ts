import { forwardRef, Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { EventBase } from '@/core/event/event-base.emitter'

@Module({
  imports: [forwardRef(() => InfrastructureModule.forRoot())],
  providers: [EventBase],
  exports: [EventBase],
})
export class CoreModule {}
