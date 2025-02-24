import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/create-machine-group.inbound-port'
import { DeleteMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/delete-machine-group.inbound-port'
import { ListMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/list-machine-group.inbound-port'
import { ListToSelectMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/list-to-select-machine-group.inbound-port'
import { PatchMachineGroupInboundPortToken } from '@/domain/machine/group/ports/inbound/patch-machine-group.inbound-port'

import { CreateMachineGroupService } from '@/application/services/machine/group/create-machine-group.service'
import { DeleteMachineGroupService } from '@/application/services/machine/group/delete-machine-group.service'
import { ListMachineGroupService } from '@/application/services/machine/group/list-machine-group.service'
import { ListToSelectMachineGroupService } from '@/application/services/machine/group/list-to-select-machine-group.service'
import { PatchMachineGroupService } from '@/application/services/machine/group/patch-machine-group.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateMachineGroupInboundPortToken,
      useClass: CreateMachineGroupService,
    },
    {
      provide: DeleteMachineGroupInboundPortToken,
      useClass: DeleteMachineGroupService,
    },
    {
      provide: ListMachineGroupInboundPortToken,
      useClass: ListMachineGroupService,
    },
    {
      provide: ListToSelectMachineGroupInboundPortToken,
      useClass: ListToSelectMachineGroupService,
    },
    {
      provide: PatchMachineGroupInboundPortToken,
      useClass: PatchMachineGroupService,
    },
  ],
  exports: [
    {
      provide: CreateMachineGroupInboundPortToken,
      useClass: CreateMachineGroupService,
    },
    {
      provide: DeleteMachineGroupInboundPortToken,
      useClass: DeleteMachineGroupService,
    },
    {
      provide: ListMachineGroupInboundPortToken,
      useClass: ListMachineGroupService,
    },
    {
      provide: ListToSelectMachineGroupInboundPortToken,
      useClass: ListToSelectMachineGroupService,
    },
    {
      provide: PatchMachineGroupInboundPortToken,
      useClass: PatchMachineGroupService,
    },
  ],
})
export class MachineGroupModule {}
