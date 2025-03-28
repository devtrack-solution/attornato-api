import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '../../dtos/criteria-paginated.dto';
import { DetailsDto } from './details.dto';

export class ListDetailsDto extends CriteriaPaginatedResponseDto<DetailsDto> {
  @ApiProperty({ type: DetailsDto, isArray: true })
  declare data: Partial<DetailsDto>[];
}
