import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { FreeField6Dto } from './free-field-6.dto';

export class ListFreeField6Dto extends CriteriaPaginatedResponseDto<FreeField6Dto> {
  @ApiProperty({ type: FreeField6Dto, isArray: true })
  declare data: Partial<FreeField6Dto>[];
}
