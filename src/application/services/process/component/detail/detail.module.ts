import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateDetailService } from './create-detail.service'
import { DeleteDetailService } from './delete-detail.service'
import { ListDetailService } from './list-detail.service'
import { ListToSelectDetailService } from './list-to-select-detail.service'
import { PatchDetailService } from './patch-detail.service'
import { ListToSelectDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/list-to-select-detail.inbound-port'
import { CreateDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/create-detail-responsible.inbound-port'
import { DeleteDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/delete-detail.inbound-port'
import { ListDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/list-detail.inbound-port'
import { PatchDetailInboundPortToken } from '@/domain/process/component/detail/ports/inbound/patch-detail.inbound-port'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateDetailInboundPortToken,
      useClass: CreateDetailService,
    },
    {
      provide: DeleteDetailInboundPortToken,
      useClass: DeleteDetailService,
    },
    {
      provide: ListDetailInboundPortToken,
      useClass: ListDetailService,
    },
    {
      provide: ListToSelectDetailInboundPortToken,
      useClass: ListToSelectDetailService,
    },
    {
      provide: PatchDetailInboundPortToken,
      useClass: PatchDetailService,
    },
  ],
  exports: [
    {
      provide: CreateDetailInboundPortToken,
      useClass: CreateDetailService,
    },
    {
      provide: DeleteDetailInboundPortToken,
      useClass: DeleteDetailService,
    },
    {
      provide: ListDetailInboundPortToken,
      useClass: ListDetailService,
    },
    {
      provide: ListToSelectDetailInboundPortToken,
      useClass: ListToSelectDetailService,
    },
    {
      provide: PatchDetailInboundPortToken,
      useClass: PatchDetailService,
    },
  ],
})
export class DetailModule {}
