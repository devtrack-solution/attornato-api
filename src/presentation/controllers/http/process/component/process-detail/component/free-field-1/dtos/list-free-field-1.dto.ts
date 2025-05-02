import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { FreeField1Dto } from './free-field-1.dto';

export class ListFreeField1Dto extends CriteriaPaginatedResponseDto<FreeField1Dto> {
  @ApiProperty({ type: FreeField1Dto, isArray: true })
  declare data: Partial<FreeField1Dto>[];
}
