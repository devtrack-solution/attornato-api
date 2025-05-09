import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class LoginDto extends BasicDto {
  @ApiProperty({ required: true })
  username!: string

  @ApiProperty({ required: true })
  password!: string
}
