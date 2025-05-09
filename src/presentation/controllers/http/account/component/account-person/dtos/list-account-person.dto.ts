import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { AccountPersonDto } from '@/presentation/controllers/http/account/component/account-person/dtos/account-person.dto'

export class ListAccountPersonDto extends CriteriaPaginatedResponseDto<AccountPersonDto> {
  @ApiProperty({ type: AccountPersonDto, isArray: true })
  declare data: Partial<AccountPersonDto>[]
}
