import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PhaseDto } from './phase.dto'

export class ListPhaseDto extends CriteriaPaginatedResponseDto<PhaseDto> {
  @ApiProperty({ type: PhaseDto, isArray: true })
  declare data: Partial<PhaseDto>[]
}
