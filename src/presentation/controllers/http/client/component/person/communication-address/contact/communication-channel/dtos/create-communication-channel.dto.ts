import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { OmitType } from '@nestjs/swagger'
import { CommunicationChannelDto } from '@/presentation/controllers/http/client/component/person/communication-address/contact/communication-channel/dtos/communication-channel.dto'

export class CreateCommunicationChannelDto
  extends OmitType(CommunicationChannelDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements CommunicationChannelType.Input {}
