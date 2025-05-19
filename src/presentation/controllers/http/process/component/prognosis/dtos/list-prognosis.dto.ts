import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PrognosisDto } from '@/presentation/controllers/http/process/component/prognosis/dtos/prognosis.dto'

export class ListPrognosisDto extends CriteriaPaginatedResponseDto<PrognosisDto> {
  @ApiProperty({ type: PrognosisDto, isArray: true })
  declare data: Partial<PrognosisDto>[]
}
