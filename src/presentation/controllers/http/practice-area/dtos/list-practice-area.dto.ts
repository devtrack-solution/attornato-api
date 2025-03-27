import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PracticeAreaDto } from '@/presentation/controllers/http/practice-area/dtos/practice-area.dto'

export class ListPracticeAreaDto extends CriteriaPaginatedResponseDto<PracticeAreaDto> {
  @ApiProperty({ type: PracticeAreaDto, isArray: true })
  declare data: Partial<PracticeAreaDto>[];
}
