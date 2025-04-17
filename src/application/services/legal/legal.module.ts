import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateLegalInboundPortToken } from '@/domain/legal/ports/inbound/create-legal.inbound-port'
import { DeleteLegalInboundPortToken } from '@/domain/legal/ports/inbound/delete-legal.inbound-port'
import { ListLegalInboundPortToken } from '@/domain/legal/ports/inbound/list-legal.inbound-port'
import { ListToSelectLegalInboundPortToken } from '@/domain/legal/ports/inbound/list-to-select-legal.inbound-port'
import { PatchLegalInboundPortToken } from '@/domain/legal/ports/inbound/patch-legal.inbound-port'
import { CreateLegalService } from './create-legal.service'
import { DeleteLegalService } from './delete-legal.service'
import { ListLegalService } from './list-legal.service'
import { ListToSelectLegalService } from './list-to-select-legal.service'
import { PatchLegalService } from './patch-legal.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateLegalInboundPortToken,
      useClass: CreateLegalService,
    },
    {
      provide: DeleteLegalInboundPortToken,
      useClass: DeleteLegalService,
    },
    {
      provide: ListLegalInboundPortToken,
      useClass: ListLegalService,
    },
    {
      provide: ListToSelectLegalInboundPortToken,
      useClass: ListToSelectLegalService,
    },
    {
      provide: PatchLegalInboundPortToken,
      useClass: PatchLegalService,
    },
  ],
  exports: [
    {
      provide: CreateLegalInboundPortToken,
      useClass: CreateLegalService,
    },
    {
      provide: DeleteLegalInboundPortToken,
      useClass: DeleteLegalService,
    },
    {
      provide: ListLegalInboundPortToken,
      useClass: ListLegalService,
    },
    {
      provide: ListToSelectLegalInboundPortToken,
      useClass: ListToSelectLegalService,
    },
    {
      provide: PatchLegalInboundPortToken,
      useClass: PatchLegalService,
    },
  ],
})
export class LegalModule {}
