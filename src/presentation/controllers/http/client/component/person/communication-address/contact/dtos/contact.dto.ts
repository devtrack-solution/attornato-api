import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateCommunicationChannelDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/dtos/create-communication-channel.dto'

export class ContactDto extends BasicDto {
  @ApiProperty()
  value!: string

  @ApiPropertyOptional({ type: CreateCommunicationChannelDto })
  communicationChannel?: CreateCommunicationChannelDto

  @ApiProperty()
  communicationChannelId!: string
}
