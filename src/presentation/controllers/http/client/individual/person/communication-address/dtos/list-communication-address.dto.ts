import { ApiProperty } from '@nestjs/swagger'
import { CommunicationAddressDto } from './communication-address.dto';
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'

export class ListCommunicationAddressDto extends CriteriaPaginatedResponseDto<CommunicationAddressDto> {
  @ApiProperty({ type: CommunicationAddressDto, isArray: true })
  declare data: Partial<CommunicationAddressDto>[];
}
