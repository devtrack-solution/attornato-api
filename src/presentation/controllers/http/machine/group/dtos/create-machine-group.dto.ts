import { OmitType } from '@nestjs/swagger'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type'
import { MachineGroupDto } from '@/presentation/controllers/http/machine/group/dtos/machine-group.dto'

export class CreateMachineGroupDto extends OmitType(MachineGroupDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements MachineGroupType.Input {}
