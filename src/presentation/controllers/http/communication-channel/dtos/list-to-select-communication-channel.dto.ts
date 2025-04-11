import { OmitType } from '@nestjs/swagger';
import { CreateCommunicationChannelDto } from './create-communication-channel.dto';
import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'


export class ListToSelectCommunicationChannelDto
  extends OmitType(CreateCommunicationChannelDto, [])

  implements Partial<CommunicationChannelType.Input> {}
