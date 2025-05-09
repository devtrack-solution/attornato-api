import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class AuthDto extends BasicDto {
  @ApiProperty({ required: true })
  username!: string

  @ApiProperty({ required: true })
  password!: string
}
