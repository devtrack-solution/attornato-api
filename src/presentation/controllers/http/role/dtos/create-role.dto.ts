import { OmitType } from '@nestjs/swagger'
import { RoleDto } from '@/presentation/controllers/http/role/dtos/role.dto'
import { RoleType } from '@/domain/securities/types/role.type'

export class CreateRoleDto extends OmitType(RoleDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements RoleType.Input {}
