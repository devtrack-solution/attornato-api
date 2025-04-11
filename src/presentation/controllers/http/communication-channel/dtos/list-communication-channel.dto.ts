import { ApiProperty } from '@nestjs/swagger'
import { CriteriaPaginatedResponseDto } from '@/presentation/controllers/http/dtos/criteria-paginated.dto'
import { CommunicationChannelDto } from '@/presentation/controllers/http/communication-channel/dtos/communication-channel.dto'

export class ListCommunicationChannelDto extends CriteriaPaginatedResponseDto<CommunicationChannelDto> {
  @ApiProperty({ type: CommunicationChannelDto, isArray: true })
  declare data: Partial<CommunicationChannelDto>[];
}
