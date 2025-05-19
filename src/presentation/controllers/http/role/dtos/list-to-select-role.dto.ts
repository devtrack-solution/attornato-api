import { OmitType } from '@nestjs/swagger'
import { CreateRoleDto } from './create-role.dto'
import { RoleType } from '@/domain/securities/types/role.type'

export class ListToSelectRoleDto extends OmitType(CreateRoleDto, []) implements Partial<RoleType.Input> {}
