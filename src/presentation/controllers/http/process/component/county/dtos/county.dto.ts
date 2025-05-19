import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class CountyDto extends BasicDto {
  @ApiProperty({ description: 'The name of the county', example: 'Administrativo', required: true })
  name!: string
}
