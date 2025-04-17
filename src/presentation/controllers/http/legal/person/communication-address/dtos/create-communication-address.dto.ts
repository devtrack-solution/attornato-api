import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type';
import { OmitType } from '@nestjs/swagger';
import { CommunicationAddressDto } from './communication-address.dto';

export class CreateCommunicationAddressDto
  extends OmitType(CommunicationAddressDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements CommunicationAddressType.Input {}
