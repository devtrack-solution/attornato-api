import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreatePartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/create-partner.inbound-port'
import { DeletePartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/delete-partner.inbound-port'
import { CreatePartnerService } from '@/application/services/process/component/partner/create-partner.service'
import { DeletePartnerService } from '@/application/services/process/component/partner/delete-partner.service'
import { ListPartnerService } from '@/application/services/process/component/partner/list-partner.service'
import { ListPartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/list-partner.inbound-port'
import { ListToSelectPartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/list-to-select-partner.inbound-port'
import { ListToSelectPartnerService } from '@/application/services/process/component/partner/list-to-select-partner.service'
import { PatchPartnerInboundPortToken } from '@/domain/process/component/partner/ports/inbound/patch-partner.inbound-port'
import { PatchPartnerService } from '@/application/services/process/component/partner/patch-partner.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreatePartnerInboundPortToken,
      useClass: CreatePartnerService,
    },
    {
      provide: DeletePartnerInboundPortToken,
      useClass: DeletePartnerService,
    },
    {
      provide: ListPartnerInboundPortToken,
      useClass: ListPartnerService,
    },
    {
      provide: ListToSelectPartnerInboundPortToken,
      useClass: ListToSelectPartnerService,
    },
    {
      provide: PatchPartnerInboundPortToken,
      useClass: PatchPartnerService,
    },
  ],
  exports: [
    {
      provide: CreatePartnerInboundPortToken,
      useClass: CreatePartnerService,
    },
    {
      provide: DeletePartnerInboundPortToken,
      useClass: DeletePartnerService,
    },
    {
      provide: ListPartnerInboundPortToken,
      useClass: ListPartnerService,
    },
    {
      provide: ListToSelectPartnerInboundPortToken,
      useClass: ListToSelectPartnerService,
    },
    {
      provide: PatchPartnerInboundPortToken,
      useClass: PatchPartnerService,
    },
  ],
})
export class PartnerModule {}
