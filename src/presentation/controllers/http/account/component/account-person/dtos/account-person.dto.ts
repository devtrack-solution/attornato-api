import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class AccountPersonDto extends BasicDto {
  @ApiProperty({ required: true })
  name!: string

  @ApiProperty()
  birthday!: Date

  @ApiProperty()
  nickName!: string

  @ApiProperty()
  gender!: string

  @ApiProperty()
  avatar!: string

  @ApiProperty()
  governanceSocialIdentity!: string
}
