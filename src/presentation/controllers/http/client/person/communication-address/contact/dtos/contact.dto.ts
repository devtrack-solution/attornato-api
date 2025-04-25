import { ApiProperty } from '@nestjs/swagger'
import { BasicDto } from '@/presentation/controllers/http/dtos/basic.dto'
import { CreateCommunicationChannelDto } from '@/presentation/controllers/http/communication-channel/dtos/create-communication-channel.dto'

export class ContactDto extends BasicDto {
  @ApiProperty()
  value!: string

  @ApiProperty({ type: CreateCommunicationChannelDto })
  communicationChannel!: CreateCommunicationChannelDto
}
