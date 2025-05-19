import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '../../../../dtos/criteria-paginated.dto'
import { OriginDto } from './origin.dto'

export class ListOriginDto extends CriteriaPaginatedResponseDto<OriginDto> {
  @ApiProperty({ type: OriginDto, isArray: true })
  declare data: Partial<OriginDto>[]
}
