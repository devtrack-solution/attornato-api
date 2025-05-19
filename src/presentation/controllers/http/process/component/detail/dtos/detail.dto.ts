import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class DetailDto extends BasicDto {
  @ApiProperty({ description: 'The name of the detail', example: 'Administrativo', required: true })
  name!: string
}
