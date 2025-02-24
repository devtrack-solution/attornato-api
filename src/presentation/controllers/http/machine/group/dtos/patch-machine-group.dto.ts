import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { CreateMachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/create-machine-group.dto'
import { MachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/machine-group.dto'

export class PatchMachineGroupDto extends OmitType(CreateMachineGroupDto, ['groupCode']) {
  // extends PartialType(CreateMachineGroupDto) {
}
