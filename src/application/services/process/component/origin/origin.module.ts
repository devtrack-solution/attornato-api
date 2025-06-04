import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateOriginService } from './create-origin.service'
import { DeleteOriginService } from './delete-origin.service'
import { ListOriginService } from './list-origin.service'
import { ListToSelectOriginService } from './list-to-select-origin.service'
import { PatchOriginService } from './patch-origin.service'
import { CreateOriginInboundPortToken } from '@/domain/process/component/origin/ports/inbound/create-origin.inbound-port'
import { DeleteOriginInboundPortToken } from '@/domain/process/component/origin/ports/inbound/delete-origin.inbound-port'
import { ListOriginInboundPortToken } from '@/domain/process/component/origin/ports/inbound/list-origin.inbound-port'
import { ListToSelectOriginInboundPortToken } from '@/domain/process/component/origin/ports/inbound/list-to-select-origin.inbound-port'
import { PatchOriginInboundPortToken } from '@/domain/process/component/origin/ports/inbound/patch-origin.inbound-port'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateOriginInboundPortToken,
      useClass: CreateOriginService,
    },
    {
      provide: DeleteOriginInboundPortToken,
      useClass: DeleteOriginService,
    },
    {
      provide: ListOriginInboundPortToken,
      useClass: ListOriginService,
    },
    {
      provide: ListToSelectOriginInboundPortToken,
      useClass: ListToSelectOriginService,
    },
    {
      provide: PatchOriginInboundPortToken,
      useClass: PatchOriginService,
    },
  ],
  exports: [
    {
      provide: CreateOriginInboundPortToken,
      useClass: CreateOriginService,
    },
    {
      provide: DeleteOriginInboundPortToken,
      useClass: DeleteOriginService,
    },
    {
      provide: ListOriginInboundPortToken,
      useClass: ListOriginService,
    },
    {
      provide: ListToSelectOriginInboundPortToken,
      useClass: ListToSelectOriginService,
    },
    {
      provide: PatchOriginInboundPortToken,
      useClass: PatchOriginService,
    },
  ],
})
export class OriginModule {}
