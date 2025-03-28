import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'



export class FreeFieldDto extends BasicDto {
  @ApiProperty({ description: 'The name of the free-field', example: 'Administrativo', required: true })
  name!: string
}
