import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '../../dtos/criteria-paginated.dto';
import { LocatorDto } from './locator.dto';

export class ListLocatorDto extends CriteriaPaginatedResponseDto<LocatorDto> {
  @ApiProperty({ type: LocatorDto, isArray: true })
  declare data: Partial<LocatorDto>[];
}
