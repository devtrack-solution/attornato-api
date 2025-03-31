import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/create-contact-type.inbound-port'
import { DeleteContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/delete-contact-type.inbound-port'
import { CreateContactTypeService } from '@/application/services/contact-type/create-contact-type.service'
import { DeleteContactTypeService } from '@/application/services/contact-type/delete-contact-type.service'
import { ListContactTypeService } from '@/application/services/contact-type/list-contact-type.service'
import { ListContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/list-contact-type.inbound-port'
import { ListToSelectContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/list-to-select-contact-type.inbound-port'
import { ListToSelectContactTypeService } from '@/application/services/contact-type/list-to-select-contact-type.service'
import { PatchContactTypeInboundPortToken } from '@/domain/contact-type/ports/inbound/patch-contact-type.inbound-port'
import { PatchContactTypeService } from '@/application/services/contact-type/patch-contact-type.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateContactTypeInboundPortToken,
      useClass: CreateContactTypeService,
    },
    {
      provide: DeleteContactTypeInboundPortToken,
      useClass: DeleteContactTypeService,
    },
    {
      provide: ListContactTypeInboundPortToken,
      useClass: ListContactTypeService,
    },
    {
      provide: ListToSelectContactTypeInboundPortToken,
      useClass: ListToSelectContactTypeService,
    },
    {
      provide: PatchContactTypeInboundPortToken,
      useClass: PatchContactTypeService,
    },
  ],
  exports: [
    {
      provide: CreateContactTypeInboundPortToken,
      useClass: CreateContactTypeService,
    },
    {
      provide: DeleteContactTypeInboundPortToken,
      useClass: DeleteContactTypeService,
    },
    {
      provide: ListContactTypeInboundPortToken,
      useClass: ListContactTypeService,
    },
    {
      provide: ListToSelectContactTypeInboundPortToken,
      useClass: ListToSelectContactTypeService,
    },
    {
      provide: PatchContactTypeInboundPortToken,
      useClass: PatchContactTypeService,
    },
  ],
})
export class ContactTypeModule {}
