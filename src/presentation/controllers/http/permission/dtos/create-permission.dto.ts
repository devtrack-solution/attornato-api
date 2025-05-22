import { OmitType } from '@nestjs/swagger'
import { PermissionDto } from '@/presentation/controllers/http/permission/dtos/permission.dto'
import { PermissionType } from '@/domain/securities/types/permission.type'

export class CreatePermissionDto extends OmitType(PermissionDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements PermissionType.Input {}
