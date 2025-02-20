import { Module } from '@nestjs/common';
import { MachineGroupModule } from '@/application/services/machine/group/machine-group.module';
import { MachineGroupHttpController } from '@/presentation/controllers/http/machine/group/machine-group-http.controller';

@Module({
  imports: [MachineGroupModule],
  controllers: [MachineGroupHttpController],
})
export class MachineGroupHttpControllerModule {}
