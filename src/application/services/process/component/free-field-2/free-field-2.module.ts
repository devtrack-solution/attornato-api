import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateFreeField2Service } from './create-free-field-2.service'
import { DeleteFreeField2Service } from './delete-free-field-2.service'
import { ListFreeField2Service } from './list-free-field-2.service'
import { ListToSelectFreeField2Service } from './list-to-select-free-field-2.service'
import { PatchFreeField2Service } from './patch-free-field-2.service'
import { CreateFreeField2InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/create-free-field-2.inbound-port'
import { DeleteFreeField2InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/delete-free-field-2.inbound-port'
import { ListFreeField2InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/list-free-field-2.inbound-port'
import { ListToSelectFreeField2InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/list-to-select-free-field-2.inbound-port'
import { PatchFreeField2InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-2/ports/inbound/patch-free-field-2.inbound-port'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateFreeField2InboundPortToken,
      useClass: CreateFreeField2Service,
    },
    {
      provide: DeleteFreeField2InboundPortToken,
      useClass: DeleteFreeField2Service,
    },
    {
      provide: ListFreeField2InboundPortToken,
      useClass: ListFreeField2Service,
    },
    {
      provide: ListToSelectFreeField2InboundPortToken,
      useClass: ListToSelectFreeField2Service,
    },
    {
      provide: PatchFreeField2InboundPortToken,
      useClass: PatchFreeField2Service,
    },
  ],
  exports: [
    {
      provide: CreateFreeField2InboundPortToken,
      useClass: CreateFreeField2Service,
    },
    {
      provide: DeleteFreeField2InboundPortToken,
      useClass: DeleteFreeField2Service,
    },
    {
      provide: ListFreeField2InboundPortToken,
      useClass: ListFreeField2Service,
    },
    {
      provide: ListToSelectFreeField2InboundPortToken,
      useClass: ListToSelectFreeField2Service,
    },
    {
      provide: PatchFreeField2InboundPortToken,
      useClass: PatchFreeField2Service,
    },
  ],
})
export class FreeField2Module {}
