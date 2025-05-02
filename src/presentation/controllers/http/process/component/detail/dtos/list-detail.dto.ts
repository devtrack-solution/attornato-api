import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '../../../../dtos/criteria-paginated.dto';
import { DetailDto } from './detail.dto';

export class ListDetailDto extends CriteriaPaginatedResponseDto<DetailDto> {
  @ApiProperty({ type: DetailDto, isArray: true })
  declare data: Partial<DetailDto>[];
}
