import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreatePartnerInboundPortToken } from '@/domain/process/partner/ports/inbound/create-partner.inbound-port'
import { DeletePartnerInboundPortToken } from '@/domain/process/partner/ports/inbound/delete-partner.inbound-port'
import { CreatePartnerService } from '@/application/services/process/partner/create-partner.service'
import { DeletePartnerService } from '@/application/services/process/partner/delete-partner.service'
import { ListPartnerService } from '@/application/services/process/partner/list-partner.service'
import { ListPartnerInboundPortToken } from '@/domain/process/partner/ports/inbound/list-partner.inbound-port'
import { ListToSelectPartnerInboundPortToken } from '@/domain/process/partner/ports/inbound/list-to-select-partner.inbound-port'
import { ListToSelectPartnerService } from '@/application/services/process/partner/list-to-select-partner.service'
import { PatchPartnerInboundPortToken } from '@/domain/process/partner/ports/inbound/patch-partner.inbound-port'
import { PatchPartnerService } from '@/application/services/process/partner/patch-partner.service'

@Module({
  imports: [CoreModule],
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
