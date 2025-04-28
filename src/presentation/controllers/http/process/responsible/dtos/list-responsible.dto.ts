import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ResponsibleDto } from './responsible.dto';

export class ListResponsibleDto extends CriteriaPaginatedResponseDto<ResponsibleDto> {
  @ApiProperty({ type: ResponsibleDto, isArray: true })
  declare data: Partial<ResponsibleDto>[];
}
