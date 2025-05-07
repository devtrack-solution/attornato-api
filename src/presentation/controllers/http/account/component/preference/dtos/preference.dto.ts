import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class PreferenceDto extends BasicDto {
  @ApiProperty({ example: '#ff0000', required: true })
  accountId!: string

  @ApiProperty({ example: 'MAIN_COLOR', required: true })
  key!: string

  @ApiProperty({ example: '#ff0000', required: true })
  value!: string
}
