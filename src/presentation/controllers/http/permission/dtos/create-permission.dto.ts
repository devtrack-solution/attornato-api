import { ApiProperty } from '@nestjs/swagger'
import { PermissionType } from '@/domain/todo/types/permission.type'

export class CreatePermissionDto implements PermissionType.Input {
  @ApiProperty({ description: 'The name of the permission', example: 'VIEW_DASHBOARD', required: true })
  name!: string

  @ApiProperty({ description: 'A short description to show in front-end', example: 'Dashboard', required: true })
  description!: string

  @ApiProperty({ description: 'The resource associated with this permission', example: 'DASHBOARD', required: true })
  resource!: string
}
