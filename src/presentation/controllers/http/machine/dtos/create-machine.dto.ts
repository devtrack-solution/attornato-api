import { MachineType } from '@/domain/machine/types/machine.type'
import { OmitType } from '@nestjs/swagger';
import { MachineDto } from '@/presentation/controllers/http/machine/dtos/machine.dto'

export class CreateMachineDto
  extends OmitType(MachineDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements MachineType.Input {}
