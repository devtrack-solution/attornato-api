import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { SubjectDto } from './subject.dto';

export class ListSubjectDto extends CriteriaPaginatedResponseDto<SubjectDto> {
  @ApiProperty({ type: SubjectDto, isArray: true })
  declare data: Partial<SubjectDto>[];
}
