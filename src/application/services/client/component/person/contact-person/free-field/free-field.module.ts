import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreateFreeFieldInboundPortToken } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/create-free-field.inbound-port'
import { CreateFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/create-free-field.service'
import { DeleteFreeFieldInboundPortToken } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/delete-free-field.inbound-port'
import { DeleteFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/delete-free-field.service'
import { ListFreeFieldInboundPortToken } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/list-free-field.inbound-port'
import { ListFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/list-free-field.service'
import { ListToSelectFreeFieldInboundPortToken } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/list-to-select-free-field.inbound-port'
import { ListToSelectFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/list-to-select-free-field.service'
import { PatchFreeFieldInboundPortToken } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/patch-free-field.inbound-port'
import { PatchFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/patch-free-field.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreateFreeFieldInboundPortToken,
      useClass: CreateFreeFieldService,
    },
    {
      provide: DeleteFreeFieldInboundPortToken,
      useClass: DeleteFreeFieldService,
    },
    {
      provide: ListFreeFieldInboundPortToken,
      useClass: ListFreeFieldService,
    },
    {
      provide: ListToSelectFreeFieldInboundPortToken,
      useClass: ListToSelectFreeFieldService,
    },
    {
      provide: PatchFreeFieldInboundPortToken,
      useClass: PatchFreeFieldService,
    },
  ],
  exports: [
    {
      provide: CreateFreeFieldInboundPortToken,
      useClass: CreateFreeFieldService,
    },
    {
      provide: DeleteFreeFieldInboundPortToken,
      useClass: DeleteFreeFieldService,
    },
    {
      provide: ListFreeFieldInboundPortToken,
      useClass: ListFreeFieldService,
    },
    {
      provide: ListToSelectFreeFieldInboundPortToken,
      useClass: ListToSelectFreeFieldService,
    },
    {
      provide: PatchFreeFieldInboundPortToken,
      useClass: PatchFreeFieldService,
    },
  ],
})
export class FreeFieldModule {}
