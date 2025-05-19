import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateJudicialInboundPortToken } from '@/domain/process/component/judicial/ports/inbound/create-judicial.inbound-port'
import { DeleteJudicialInboundPortToken } from '@/domain/process/component/judicial/ports/inbound/delete-judicial.inbound-port'
import { ListJudicialInboundPortToken } from '@/domain/process/component/judicial/ports/inbound/list-judicial.inbound-port'
import { ListToSelectJudicialInboundPortToken } from '@/domain/process/component/judicial/ports/inbound/list-to-select-judicial.inbound-port'
import { PatchJudicialInboundPortToken } from '@/domain/process/component/judicial/ports/inbound/patch-judicial.inbound-port'
import { CreateJudicialService } from './create-judicial.service'
import { DeleteJudicialService } from './delete-judicial.service'
import { ListJudicialService } from './list-judicial.service'
import { ListToSelectJudicialService } from './list-to-select-judicial.service'
import { PatchJudicialService } from './patch-judicial.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateJudicialInboundPortToken,
      useClass: CreateJudicialService,
    },
    {
      provide: DeleteJudicialInboundPortToken,
      useClass: DeleteJudicialService,
    },
    {
      provide: ListJudicialInboundPortToken,
      useClass: ListJudicialService,
    },
    {
      provide: ListToSelectJudicialInboundPortToken,
      useClass: ListToSelectJudicialService,
    },
    {
      provide: PatchJudicialInboundPortToken,
      useClass: PatchJudicialService,
    },
  ],
  exports: [
    {
      provide: CreateJudicialInboundPortToken,
      useClass: CreateJudicialService,
    },
    {
      provide: DeleteJudicialInboundPortToken,
      useClass: DeleteJudicialService,
    },
    {
      provide: ListJudicialInboundPortToken,
      useClass: ListJudicialService,
    },
    {
      provide: ListToSelectJudicialInboundPortToken,
      useClass: ListToSelectJudicialService,
    },
    {
      provide: PatchJudicialInboundPortToken,
      useClass: PatchJudicialService,
    },
  ],
})
export class JudicialModule {}
