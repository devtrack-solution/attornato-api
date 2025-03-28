import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { FreeFieldDto } from '@/presentation/controllers/http/free-field/dtos/free-field.dto'

export class ListFreeFieldDto extends CriteriaPaginatedResponseDto<FreeFieldDto> {
  @ApiProperty({ type: FreeFieldDto, isArray: true })
  declare data: Partial<FreeFieldDto>[];
}
