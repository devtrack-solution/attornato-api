import { ApiProperty } from '@nestjs/swagger'
import { LegalDto } from './legal.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListLegalDto extends CriteriaPaginatedResponseDto<LegalDto> {
  @ApiProperty({ type: LegalDto, isArray: true })
  declare data: Partial<LegalDto>[];
}
