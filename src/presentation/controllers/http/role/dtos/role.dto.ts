import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreatePermissionDto } from '@/presentation/controllers/http/permission/dtos/create-permission.dto'

export class RoleDto extends BasicDto {
  @ApiProperty({ description: 'The name of the role', example: 'Role01', required: true })
  name!: string

  @ApiProperty({ description: 'The description of the role', example: 'Role01 description', required: true })
  description!: string

  @ApiProperty({ description: 'The level of the role', example: 1, required: true })
  level!: number

  @ApiPropertyOptional({
    description: 'Unique identifier of the entity',
    example: "['f47ac10b-58cc-4372-a567-0e02b2c3d475']",
    required: false,
  })
  permissionIds?: string[]

  @ApiPropertyOptional({
    type: [CreatePermissionDto],
    required: false,
  })
  permissions?: CreatePermissionDto[]
}
