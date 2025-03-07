import { OmitType } from '@nestjs/swagger';
import { CreateMachineDto } from '@/presentation/controllers/http/machine/dtos/create-machine.dto'
import { MachineType } from '@/domain/machine/types/machine.type'

export class PatchMachineDto extends OmitType(CreateMachineDto, ['name', 'machineCode']) implements Partial<MachineType.Input> {}
