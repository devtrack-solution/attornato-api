import { OmitType } from '@nestjs/swagger';
import { CreateCommunicationChannelDto } from '@/presentation/controllers/http/client/person/communication-address/contact/communication-channel/dtos/create-communication-channel.dto'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'

export class PatchCommunicationChannelDto extends OmitType(CreateCommunicationChannelDto, []) implements Partial<CommunicationChannelType.Input> {}
