import { OmitType } from '@nestjs/swagger';
import { CreateCommunicationChannelDto } from '@/presentation/controllers/http/communication-channel/dtos/create-communication-channel.dto'
import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'

export class PatchCommunicationChannelDto extends OmitType(CreateCommunicationChannelDto, []) implements Partial<CommunicationChannelType.Input> {}
