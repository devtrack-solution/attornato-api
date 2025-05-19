import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ProfileDto } from '@/presentation/controllers/http/client/component/profile/dtos/profile.dto'

export class ListProfileDto extends CriteriaPaginatedResponseDto<ProfileDto> {
  @ApiProperty({ type: ProfileDto, isArray: true })
  declare data: Partial<ProfileDto>[]
}
