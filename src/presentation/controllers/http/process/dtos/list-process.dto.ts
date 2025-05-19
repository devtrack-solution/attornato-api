import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ProcessDto } from './process.dto'

export class ListProcessDto extends CriteriaPaginatedResponseDto<ProcessDto> {
  @ApiProperty({ type: ProcessDto, isArray: true })
  declare data: Partial<ProcessDto>[]
}
