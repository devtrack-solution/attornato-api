import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { AccountDto } from './account.dto';

export class ListAccountDto extends CriteriaPaginatedResponseDto<AccountDto> {
  @ApiProperty({ type: AccountDto, isArray: true })
  declare data: Partial<AccountDto>[];
}
