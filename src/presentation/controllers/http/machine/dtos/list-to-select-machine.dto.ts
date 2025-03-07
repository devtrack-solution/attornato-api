import { OmitType } from '@nestjs/swagger';
import { CreateMachineDto } from './create-machine.dto';
import { MachineType } from '@/domain/machine/types/machine.type'


export class ListToSelectMachineDto
  extends OmitType(CreateMachineDto, ['name', 'machineCode'])
  implements Partial<MachineType.Input> {}
