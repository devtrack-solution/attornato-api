import { ApiProperty } from '@nestjs/swagger'
import { ContactDto } from './contact.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListContactDto extends CriteriaPaginatedResponseDto<ContactDto> {
  @ApiProperty({ type: ContactDto, isArray: true })
  declare data: Partial<ContactDto>[];
}
