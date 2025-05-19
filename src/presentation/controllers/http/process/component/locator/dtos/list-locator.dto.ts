import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { LocatorDto } from '@/presentation/controllers/http/process/component/locator/dtos/locator.dto'

export class ListLocatorDto extends CriteriaPaginatedResponseDto<LocatorDto> {
  @ApiProperty({ type: LocatorDto, isArray: true })
  declare data: Partial<LocatorDto>[]
}
