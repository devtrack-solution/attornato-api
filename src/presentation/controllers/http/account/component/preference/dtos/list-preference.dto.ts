import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { PreferenceDto } from '@/presentation/controllers/http/account/component/preference/dtos/preference.dto'

export class ListPreferenceDto extends CriteriaPaginatedResponseDto<PreferenceDto> {
  @ApiProperty({ type: PreferenceDto, isArray: true })
  declare data: Partial<PreferenceDto>[]
}
