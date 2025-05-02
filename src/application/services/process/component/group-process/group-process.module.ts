import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/create-group-process.inbound-port'
import { DeleteGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/delete-group-process.inbound-port'
import { CreateGroupProcessService } from '@/application/services/process/component/group-process/create-group-process.service'
import { DeleteGroupProcessService } from '@/application/services/process/component/group-process/delete-group-process.service'
import { ListGroupProcessService } from '@/application/services/process/component/group-process/list-group-process.service'
import { ListGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/list-group-process.inbound-port'
import { ListToSelectGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/list-to-select-group-process.inbound-port'
import { ListToSelectGroupProcessService } from '@/application/services/process/component/group-process/list-to-select-group-process.service'
import { PatchGroupProcessInboundPortToken } from '@/domain/process/component/group-process/ports/inbound/patch-group-process.inbound-port'
import { PatchGroupProcessService } from '@/application/services/process/component/group-process/patch-group-process.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateGroupProcessInboundPortToken,
      useClass: CreateGroupProcessService,
    },
    {
      provide: DeleteGroupProcessInboundPortToken,
      useClass: DeleteGroupProcessService,
    },
    {
      provide: ListGroupProcessInboundPortToken,
      useClass: ListGroupProcessService,
    },
    {
      provide: ListToSelectGroupProcessInboundPortToken,
      useClass: ListToSelectGroupProcessService,
    },
    {
      provide: PatchGroupProcessInboundPortToken,
      useClass: PatchGroupProcessService,
    },
  ],
  exports: [
    {
      provide: CreateGroupProcessInboundPortToken,
      useClass: CreateGroupProcessService,
    },
    {
      provide: DeleteGroupProcessInboundPortToken,
      useClass: DeleteGroupProcessService,
    },
    {
      provide: ListGroupProcessInboundPortToken,
      useClass: ListGroupProcessService,
    },
    {
      provide: ListToSelectGroupProcessInboundPortToken,
      useClass: ListToSelectGroupProcessService,
    },
    {
      provide: PatchGroupProcessInboundPortToken,
      useClass: PatchGroupProcessService,
    },
  ],
})
export class GroupProcessModule {}
