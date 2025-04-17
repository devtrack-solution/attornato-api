import { ApiProperty } from '@nestjs/swagger'
import { PersonDto } from './person.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListPersonDto extends CriteriaPaginatedResponseDto<PersonDto> {
  @ApiProperty({ type: PersonDto, isArray: true })
  declare data: Partial<PersonDto>[];
}
