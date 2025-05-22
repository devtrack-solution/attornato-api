import { OmitType } from '@nestjs/swagger'
import { CreatePermissionDto } from '@/presentation/controllers/http/permission/dtos/create-permission.dto'
import { PermissionType } from '@/domain/securities/types/permission.type'

export class PatchPermissionDto extends OmitType(CreatePermissionDto, []) implements Partial<PermissionType.Input> {}
