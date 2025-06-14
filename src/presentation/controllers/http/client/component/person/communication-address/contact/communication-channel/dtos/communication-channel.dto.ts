import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class CommunicationChannelDto extends BasicDto {
  @ApiProperty({ description: 'The name of the practice-area', example: 'Telefone', required: false })
  name?: string
}
