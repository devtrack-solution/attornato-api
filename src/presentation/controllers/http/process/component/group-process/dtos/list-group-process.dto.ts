import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { GroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/group-process.dto'

export class ListGroupProcessDto extends CriteriaPaginatedResponseDto<GroupProcessDto> {
  @ApiProperty({ type: GroupProcessDto, isArray: true })
  declare data: Partial<GroupProcessDto>[]
}
