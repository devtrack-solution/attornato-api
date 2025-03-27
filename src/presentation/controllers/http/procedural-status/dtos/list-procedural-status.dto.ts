import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ProceduralStatusDto } from '@/presentation/controllers/http/procedural-status/dtos/procedural-status.dto'

export class ListProceduralStatusDto extends CriteriaPaginatedResponseDto<ProceduralStatusDto> {
  @ApiProperty({ type: ProceduralStatusDto, isArray: true })
  declare data: Partial<ProceduralStatusDto>[];
}
