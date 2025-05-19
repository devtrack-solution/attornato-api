import { OmitType } from '@nestjs/swagger'
import { CreateRoleDto } from '@/presentation/controllers/http/role/dtos/create-role.dto'
import { RoleType } from '@/domain/securities/types/role.type'

export class PatchRoleDto extends OmitType(CreateRoleDto, []) implements Partial<RoleType.Input> {}
