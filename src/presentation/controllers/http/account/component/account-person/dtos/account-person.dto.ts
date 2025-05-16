import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class AccountPersonDto extends BasicDto {
  @ApiProperty({ required: true })
  name!: string

  @ApiProperty({ required: true })
  birthday!: Date

  @ApiPropertyOptional({ required: false })
  nickName?: string

  @ApiPropertyOptional({ required: false })
  gender?: string

  @ApiPropertyOptional({ required: false })
  avatar?: string

  @ApiPropertyOptional({ required: false })
  governanceSocialIdentity?: string
}
