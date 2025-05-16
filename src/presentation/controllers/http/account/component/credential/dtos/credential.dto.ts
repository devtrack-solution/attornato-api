import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class CredentialDto extends BasicDto {
  @ApiProperty({ required: true })
  username!: string

  @ApiPropertyOptional({ required: false })
  password?: string

  @ApiProperty({ required: true })
  roleId!: string
}
