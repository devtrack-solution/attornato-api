import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class ProceduralStatusDto extends BasicDto {
  @ApiProperty({ description: 'The name of the procedural-status', example: 'Administrativo', required: true })
  name!: string
}
