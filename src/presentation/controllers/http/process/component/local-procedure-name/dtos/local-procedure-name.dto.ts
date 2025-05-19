import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'

export class LocalProcedureNameDto extends BasicDto {
  @ApiProperty({ description: 'The name of the local-procedure-name', example: 'Administrativo', required: true })
  name!: string
}
