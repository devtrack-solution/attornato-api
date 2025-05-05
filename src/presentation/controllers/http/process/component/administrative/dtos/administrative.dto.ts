import { ApiProperty } from '@nestjs/swagger'
import { ProcessDto } from '@/presentation/controllers/http/process/dtos/process.dto'

export class AdministrativeDto extends ProcessDto {
  @ApiProperty({ description: 'The cnjNumber of the process', example: 'Aguardando numeração', required: true })
  cnjNumber!: string
}
