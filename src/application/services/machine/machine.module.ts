import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateMachineInboundPortToken } from '@/domain/machine/ports/inbound/create-machine.inbound-port'
import { DeleteMachineInboundPortToken } from '@/domain/machine/ports/inbound/delete-machine.inbound-port'
import { CreateMachineService } from '@/application/services/machine/create-machine.service'
import { DeleteMachineService } from '@/application/services/machine/delete-machine.service'
import { ListMachineService } from '@/application/services/machine/list-machine.service'
import { ListMachineInboundPortToken } from '@/domain/machine/ports/inbound/list-machine.inbound-port'
import { ListToSelectMachineInboundPortToken } from '@/domain/machine/ports/inbound/list-to-select-machine.inbound-port'
import { ListToSelectMachineService } from '@/application/services/machine/list-to-select-machine.service'
import { PatchMachineInboundPortToken } from '@/domain/machine/ports/inbound/patch-machine.inbound-port'
import { PatchMachineService } from '@/application/services/machine/patch-machine.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateMachineInboundPortToken,
      useClass: CreateMachineService,
    },
    {
      provide: DeleteMachineInboundPortToken,
      useClass: DeleteMachineService,
    },
    {
      provide: ListMachineInboundPortToken,
      useClass: ListMachineService,
    },
    {
      provide: ListToSelectMachineInboundPortToken,
      useClass: ListToSelectMachineService,
    },
    {
      provide: PatchMachineInboundPortToken,
      useClass: PatchMachineService,
    },
  ],
  exports: [
    {
      provide: CreateMachineInboundPortToken,
      useClass: CreateMachineService,
    },
    {
      provide: DeleteMachineInboundPortToken,
      useClass: DeleteMachineService,
    },
    {
      provide: ListMachineInboundPortToken,
      useClass: ListMachineService,
    },
    {
      provide: ListToSelectMachineInboundPortToken,
      useClass: ListToSelectMachineService,
    },
    {
      provide: PatchMachineInboundPortToken,
      useClass: PatchMachineService,
    },
  ],
})
export class MachineModule {}
