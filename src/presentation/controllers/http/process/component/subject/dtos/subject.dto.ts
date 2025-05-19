import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class SubjectDto extends BasicDto {
  @ApiProperty({ description: 'The name of the subject', example: 'Administrativo', required: true })
  name!: string
}
