import { ApiProperty } from '@nestjs/swagger'
import { LocalProcedureNameDto } from './local-procedure-name.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListLocalProcedureNameDto extends CriteriaPaginatedResponseDto<LocalProcedureNameDto> {
  @ApiProperty({ type: LocalProcedureNameDto, isArray: true })
  declare data: Partial<LocalProcedureNameDto>[];
}
