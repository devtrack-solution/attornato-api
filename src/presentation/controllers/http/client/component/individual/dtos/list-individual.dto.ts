import { ApiProperty } from '@nestjs/swagger'
import { IndividualDto } from './individual.dto'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListIndividualDto extends CriteriaPaginatedResponseDto<IndividualDto> {
  @ApiProperty({ type: IndividualDto, isArray: true })
  declare data: Partial<IndividualDto>[]
}
