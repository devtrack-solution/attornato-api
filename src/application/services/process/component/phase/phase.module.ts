import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreatePhaseInboundPortToken } from '@/domain/process/component/phase/ports/inbound/create-phase-responsible.inbound-port'
import { DeletePhaseInboundPortToken } from '@/domain/process/component/phase/ports/inbound/delete-phase.inbound-port'
import { ListPhaseInboundPortToken } from '@/domain/process/component/phase/ports/inbound/list-phase.inbound-port'
import { ListToSelectPhaseInboundPortToken } from '@/domain/process/component/phase/ports/inbound/list-to-select-phase.inbound-port'
import { PatchPhaseInboundPortToken } from '@/domain/process/component/phase/ports/inbound/patch-phase.inbound-port'
import { CreatePhaseService } from './create-phase.service'
import { DeletePhaseService } from './delete-phase.service'
import { ListPhaseService } from './list-phase.service'
import { ListToSelectPhaseService } from './list-to-select-phase.service'
import { PatchPhaseService } from './patch-phase.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreatePhaseInboundPortToken,
      useClass: CreatePhaseService,
    },
    {
      provide: DeletePhaseInboundPortToken,
      useClass: DeletePhaseService,
    },
    {
      provide: ListPhaseInboundPortToken,
      useClass: ListPhaseService,
    },
    {
      provide: ListToSelectPhaseInboundPortToken,
      useClass: ListToSelectPhaseService,
    },
    {
      provide: PatchPhaseInboundPortToken,
      useClass: PatchPhaseService,
    },
  ],
  exports: [
    {
      provide: CreatePhaseInboundPortToken,
      useClass: CreatePhaseService,
    },
    {
      provide: DeletePhaseInboundPortToken,
      useClass: DeletePhaseService,
    },
    {
      provide: ListPhaseInboundPortToken,
      useClass: ListPhaseService,
    },
    {
      provide: ListToSelectPhaseInboundPortToken,
      useClass: ListToSelectPhaseService,
    },
    {
      provide: PatchPhaseInboundPortToken,
      useClass: PatchPhaseService,
    },
  ],
})
export class PhaseModule {}
