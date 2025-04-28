import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '../../../dtos/criteria-paginated.dto';
import { CountyDto } from './county.dto';

export class ListCountyDto extends CriteriaPaginatedResponseDto<CountyDto> {
  @ApiProperty({ type: CountyDto, isArray: true })
  declare data: Partial<CountyDto>[];
}
