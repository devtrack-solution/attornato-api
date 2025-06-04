import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateFreeField1Service } from './create-free-field-1.service'
import { DeleteFreeField1Service } from './delete-free-field-1.service'
import { ListFreeField1Service } from './list-free-field-1.service'
import { ListToSelectFreeField1Service } from './list-to-select-free-field-1.service'
import { PatchFreeField1Service } from './patch-free-field-1.service'
import { CreateFreeField1InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/create-free-field-1.inbound-port'
import { DeleteFreeField1InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/delete-free-field-1.inbound-port'
import { ListFreeField1InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/list-free-field-1.inbound-port'
import { ListToSelectFreeField1InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/list-to-select-free-field-1.inbound-port'
import { PatchFreeField1InboundPortToken } from '@/domain/process/component/process-detail/component/free-field-1/ports/inbound/patch-free-field-1.inbound-port'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateFreeField1InboundPortToken,
      useClass: CreateFreeField1Service,
    },
    {
      provide: DeleteFreeField1InboundPortToken,
      useClass: DeleteFreeField1Service,
    },
    {
      provide: ListFreeField1InboundPortToken,
      useClass: ListFreeField1Service,
    },
    {
      provide: ListToSelectFreeField1InboundPortToken,
      useClass: ListToSelectFreeField1Service,
    },
    {
      provide: PatchFreeField1InboundPortToken,
      useClass: PatchFreeField1Service,
    },
  ],
  exports: [
    {
      provide: CreateFreeField1InboundPortToken,
      useClass: CreateFreeField1Service,
    },
    {
      provide: DeleteFreeField1InboundPortToken,
      useClass: DeleteFreeField1Service,
    },
    {
      provide: ListFreeField1InboundPortToken,
      useClass: ListFreeField1Service,
    },
    {
      provide: ListToSelectFreeField1InboundPortToken,
      useClass: ListToSelectFreeField1Service,
    },
    {
      provide: PatchFreeField1InboundPortToken,
      useClass: PatchFreeField1Service,
    },
  ],
})
export class FreeField1Module {}
