import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { ContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/contact-type.dto'

export class ListContactTypeDto extends CriteriaPaginatedResponseDto<ContactTypeDto> {
  @ApiProperty({ type: ContactTypeDto, isArray: true })
  declare data: Partial<ContactTypeDto>[];
}
