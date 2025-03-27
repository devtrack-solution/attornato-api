import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import {
  ListToSelectActionObjectInboundPortToken
} from '@/domain/action-object/ports/inbound/list-to-select-action-object.inbound-port'
import {
  ListToSelectActionObjectService
} from '@/application/services/action-object/list-to-select-action-object.service'
import {
  PatchActionObjectInboundPortToken
} from '@/domain/action-object/ports/inbound/patch-action-object.inbound-port'
import {
  CreateActionObjectInboundPortToken
} from '@/domain/action-object/ports/inbound/create-action-object.inbound-port'
import { CreateActionObjectService } from '@/application/services/action-object/create-action-object.service'
import {
  DeleteActionObjectInboundPortToken
} from '@/domain/action-object/ports/inbound/delete-action-object.inbound-port'
import { DeleteActionObjectService } from '@/application/services/action-object/delete-action-object.service'
import { ListActionObjectInboundPortToken } from '@/domain/action-object/ports/inbound/list-action-object.inbound-port'
import { ListActionObjectService } from '@/application/services/action-object/list-action-object.service'
import { PatchActionObjectService } from '@/application/services/action-object/patch-action-object.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateActionObjectInboundPortToken,
      useClass: CreateActionObjectService,
    },
    {
      provide: DeleteActionObjectInboundPortToken,
      useClass: DeleteActionObjectService,
    },
    {
      provide: ListActionObjectInboundPortToken,
      useClass: ListActionObjectService,
    },
    {
      provide: ListToSelectActionObjectInboundPortToken,
      useClass: ListToSelectActionObjectService,
    },
    {
      provide: PatchActionObjectInboundPortToken,
      useClass: PatchActionObjectService,
    },
  ],
  exports: [
    {
      provide: CreateActionObjectInboundPortToken,
      useClass: CreateActionObjectService,
    },
    {
      provide: DeleteActionObjectInboundPortToken,
      useClass: DeleteActionObjectService,
    },
    {
      provide: ListActionObjectInboundPortToken,
      useClass: ListActionObjectService,
    },
    {
      provide: ListToSelectActionObjectInboundPortToken,
      useClass: ListToSelectActionObjectService,
    },
    {
      provide: PatchActionObjectInboundPortToken,
      useClass: PatchActionObjectService,
    },
  ],
})
export class ActionObjectModule {}
