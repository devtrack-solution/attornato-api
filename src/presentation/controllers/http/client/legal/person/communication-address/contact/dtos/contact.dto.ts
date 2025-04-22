import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import {
  CommunicationChannelDto
} from '@/presentation/controllers/http/communication-channel/dtos/communication-channel.dto'

export class ContactDto extends BasicDto {
  @ApiProperty()
  value!: string

  @ApiProperty({ type: CommunicationChannelDto })
  communicationChannel!: CommunicationChannelDto
}
