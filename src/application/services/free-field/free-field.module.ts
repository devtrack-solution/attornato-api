import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateFreeFieldInboundPortToken } from '@/domain/free-field/ports/inbound/create-free-field.inbound-port'
import { CreateFreeFieldService } from '@/application/services/free-field/create-free-field.service'
import { DeleteFreeFieldInboundPortToken } from '@/domain/free-field/ports/inbound/delete-free-field.inbound-port'
import { DeleteFreeFieldService } from '@/application/services/free-field/delete-free-field.service'
import { ListFreeFieldInboundPortToken } from '@/domain/free-field/ports/inbound/list-free-field.inbound-port'
import { ListFreeFieldService } from '@/application/services/free-field/list-free-field.service'
import {
  ListToSelectFreeFieldInboundPortToken
} from '@/domain/free-field/ports/inbound/list-to-select-free-field.inbound-port'
import { ListToSelectFreeFieldService } from '@/application/services/free-field/list-to-select-free-field.service'
import { PatchFreeFieldInboundPortToken } from '@/domain/free-field/ports/inbound/patch-free-field.inbound-port'
import { PatchFreeFieldService } from '@/application/services/free-field/patch-free-field.service'

@Module({
  imports: [CoreModule],
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
