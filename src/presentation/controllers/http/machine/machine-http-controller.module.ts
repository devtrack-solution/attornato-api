import { Module } from '@nestjs/common'
import { MachineModule } from '@/application/services/machine/machine.module'
import { MachineHttpController } from '@/presentation/controllers/http/machine/machine-http.controller'

@Module({
  imports: [MachineModule],
  controllers: [MachineHttpController],
})
export class MachineHttpControllerModule {}
