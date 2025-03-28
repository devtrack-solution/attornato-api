import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '../../dtos/criteria-paginated.dto';
import { LocalProcedureNameDto } from './local-procedure-name.dto';

export class ListLocalProcedureNameDto extends CriteriaPaginatedResponseDto<LocalProcedureNameDto> {
  @ApiProperty({ type: LocalProcedureNameDto, isArray: true })
  declare data: Partial<LocalProcedureNameDto>[];
}
