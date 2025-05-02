import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { FreeField2Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-2/dtos/free-field-2.dto'

export class ListFreeField2Dto extends CriteriaPaginatedResponseDto<FreeField2Dto> {
  @ApiProperty({ type: FreeField2Dto, isArray: true })
  declare data: Partial<FreeField2Dto>[]
}
