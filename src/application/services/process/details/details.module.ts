import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateDetailsService } from './create-details.service'
import { DeleteDetailsService } from './delete-details.service'
import { ListDetailsService } from './list-details.service'
import { ListToSelectDetailsService } from './list-to-select-details.service'
import { PatchDetailsService } from './patch-details.service'
import { ListToSelectDetailsInboundPortToken } from '@/domain/process/details/ports/inbound/list-to-select-details.inbound-port'
import { CreateDetailsInboundPortToken } from '@/domain/process/details/ports/inbound/create-details-responsible.inbound-port'
import { DeleteDetailsInboundPortToken } from '@/domain/process/details/ports/inbound/delete-details.inbound-port'
import { ListDetailsInboundPortToken } from '@/domain/process/details/ports/inbound/list-details.inbound-port'
import { PatchDetailsInboundPortToken } from '@/domain/process/details/ports/inbound/patch-details.inbound-port'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateDetailsInboundPortToken,
      useClass: CreateDetailsService,
    },
    {
      provide: DeleteDetailsInboundPortToken,
      useClass: DeleteDetailsService,
    },
    {
      provide: ListDetailsInboundPortToken,
      useClass: ListDetailsService,
    },
    {
      provide: ListToSelectDetailsInboundPortToken,
      useClass: ListToSelectDetailsService,
    },
    {
      provide: PatchDetailsInboundPortToken,
      useClass: PatchDetailsService,
    },
  ],
  exports: [
    {
      provide: CreateDetailsInboundPortToken,
      useClass: CreateDetailsService,
    },
    {
      provide: DeleteDetailsInboundPortToken,
      useClass: DeleteDetailsService,
    },
    {
      provide: ListDetailsInboundPortToken,
      useClass: ListDetailsService,
    },
    {
      provide: ListToSelectDetailsInboundPortToken,
      useClass: ListToSelectDetailsService,
    },
    {
      provide: PatchDetailsInboundPortToken,
      useClass: PatchDetailsService,
    },
  ],
})
export class DetailsModule {}
