import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { JudicialDto } from './judicial.dto';

export class ListJudicialDto extends CriteriaPaginatedResponseDto<JudicialDto> {
  @ApiProperty({ type: JudicialDto, isArray: true })
  declare data: Partial<JudicialDto>[];
}
