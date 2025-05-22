import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class PermissionDto extends BasicDto {
  @ApiProperty({ description: 'The name of the permission', example: 'VIEW_DASHBOARD', required: true })
  name!: string

  @ApiProperty({ description: 'A short description to show in front-end', example: 'Dashboard', required: true })
  description!: string

  @ApiProperty({ description: 'The resource associated with this permission', example: 'DASHBOARD', required: true })
  resource!: string
}
