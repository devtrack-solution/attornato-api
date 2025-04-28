import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PartnerDto } from '@/presentation/controllers/http/process/partner/dtos/partner.dto'

export class ListPartnerDto extends CriteriaPaginatedResponseDto<PartnerDto> {
  @ApiProperty({ type: PartnerDto, isArray: true })
  declare data: Partial<PartnerDto>[];
}
