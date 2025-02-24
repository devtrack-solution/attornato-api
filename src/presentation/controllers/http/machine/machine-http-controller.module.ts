import { Module } from '@nestjs/common'
import { MachineModule } from '@/application/services/machine/machine.module'
import { MachineHttpController } from '@/presentation/controllers/http/machine/machine-http.controller'
import { MachineGroupHttpControllerModule } from '@/presentation/controllers/http/machine/group/machine-group-http-controller.module'

@Module({
  imports: [MachineModule, MachineGroupHttpControllerModule],
  controllers: [MachineHttpController],
  exports: [MachineGroupHttpControllerModule],
})
export class MachineHttpControllerModule {}
