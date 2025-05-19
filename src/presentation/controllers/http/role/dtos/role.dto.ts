import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreatePermissionDto } from '@/presentation/controllers/http/permission/dtos/create-permission.dto'

export class RoleDto extends BasicDto {
  @ApiProperty({ description: 'The name of the role', example: 'Administrativo', required: true })
  name!: string

  @ApiPropertyOptional({ description: 'The description of the role', example: 'Administrativo', required: false })
  description?: string

  @ApiProperty({ description: 'The level of the role', example: 'Administrativo', required: false })
  level!: number

  @ApiPropertyOptional({
    description: 'Unique identifier of the entity',
    example: '[f47ac10b-58cc-4372-a567-0e02b2c3d475]',
    required: false,
  })
  permissionIds?: string[]

  @ApiPropertyOptional({ type: CreatePermissionDto })
  permissions?: CreatePermissionDto[]
}
