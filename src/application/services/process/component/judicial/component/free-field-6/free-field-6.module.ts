import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateFreeField6Service } from './create-free-field-6.service'
import { DeleteFreeField6Service } from './delete-free-field-6.service'
import { ListFreeField6Service } from './list-free-field-6.service'
import { ListToSelectFreeField6Service } from './list-to-select-free-field-6.service'
import { PatchFreeField6Service } from './patch-free-field-6.service'
import { CreateFreeField6InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/create-free-field-6.inbound-port'
import { DeleteFreeField6InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/delete-free-field-6.inbound-port'
import { ListFreeField6InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/list-free-field-6.inbound-port'
import { ListToSelectFreeField6InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/list-to-select-free-field-6.inbound-port'
import { PatchFreeField6InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-6/ports/inbound/patch-free-field-6.inbound-port'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateFreeField6InboundPortToken,
      useClass: CreateFreeField6Service,
    },
    {
      provide: DeleteFreeField6InboundPortToken,
      useClass: DeleteFreeField6Service,
    },
    {
      provide: ListFreeField6InboundPortToken,
      useClass: ListFreeField6Service,
    },
    {
      provide: ListToSelectFreeField6InboundPortToken,
      useClass: ListToSelectFreeField6Service,
    },
    {
      provide: PatchFreeField6InboundPortToken,
      useClass: PatchFreeField6Service,
    },
  ],
  exports: [
    {
      provide: CreateFreeField6InboundPortToken,
      useClass: CreateFreeField6Service,
    },
    {
      provide: DeleteFreeField6InboundPortToken,
      useClass: DeleteFreeField6Service,
    },
    {
      provide: ListFreeField6InboundPortToken,
      useClass: ListFreeField6Service,
    },
    {
      provide: ListToSelectFreeField6InboundPortToken,
      useClass: ListToSelectFreeField6Service,
    },
    {
      provide: PatchFreeField6InboundPortToken,
      useClass: PatchFreeField6Service,
    },
  ],
})
export class FreeField6Module {}
