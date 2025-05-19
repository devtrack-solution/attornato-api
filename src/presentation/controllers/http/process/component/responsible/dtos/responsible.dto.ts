import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class ResponsibleDto extends BasicDto {
  @ApiProperty({ description: 'The name of the group-process', example: 'Administrativo', required: true })
  name!: string
}
