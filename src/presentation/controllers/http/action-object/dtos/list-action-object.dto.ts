import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ActionObjectDto } from '@/presentation/controllers/http/action-object/dtos/action-object.dto'

export class ListActionObjectDto extends CriteriaPaginatedResponseDto<ActionObjectDto> {
  @ApiProperty({ type: ActionObjectDto, isArray: true })
  declare data: Partial<ActionObjectDto>[];
}
