import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'
import { OmitType } from '@nestjs/swagger';
import { CommunicationChannelDto } from '@/presentation/controllers/http/communication-channel/dtos/communication-channel.dto'

export class CreateCommunicationChannelDto
  extends OmitType(CommunicationChannelDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements CommunicationChannelType.Input {}
