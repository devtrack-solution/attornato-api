import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class CredentialDto extends BasicDto {
  @ApiProperty({ required: true })
  username!: string

  @ApiPropertyOptional({ required: false })
  password?: string

  @ApiProperty({ example: "['1f2fa729-5bce-4f01-8158-335000b3c2b2']",required: true })
  roleIds!: string[]
}
