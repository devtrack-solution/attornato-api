import { ApiProperty } from '@nestjs/swagger'
import { ContactPersonLegalDto } from './contact-person-legal.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListContactPersonLegalDto extends CriteriaPaginatedResponseDto<ContactPersonLegalDto> {
  @ApiProperty({ type: ContactPersonLegalDto, isArray: true })
  declare data: Partial<ContactPersonLegalDto>[];
}
