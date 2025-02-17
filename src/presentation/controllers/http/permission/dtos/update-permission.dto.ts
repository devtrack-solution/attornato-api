import { PermissionType } from '@/domain/todo/types/permission.type'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePermissionDto implements Partial<PermissionType.Input> {
  @ApiProperty({ description: 'A short description to show in front-end', example: 'Dashboard', required: false })
  description!: string
}
