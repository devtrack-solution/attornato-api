import { ApiProperty } from '@nestjs/swagger'
import { ContactPersonDto } from './contact-person.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListContactPersonDto extends CriteriaPaginatedResponseDto<ContactPersonDto> {
  @ApiProperty({ type: ContactPersonDto, isArray: true })
  declare data: Partial<ContactPersonDto>[];
}
