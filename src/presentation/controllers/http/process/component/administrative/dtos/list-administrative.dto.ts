import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { AdministrativeDto } from './administrative.dto'

export class ListAdministrativeDto extends CriteriaPaginatedResponseDto<AdministrativeDto> {
  @ApiProperty({ type: AdministrativeDto, isArray: true })
  declare data: Partial<AdministrativeDto>[]
}
