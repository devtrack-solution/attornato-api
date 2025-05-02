import { OmitType } from '@nestjs/swagger'
import { CommunicationAddressType } from '@/domain/client/component/person/communication-address/types/communication-address.type'
import { CommunicationAddressDto } from '@/presentation/controllers/http/client/person/communication-address/dtos/communication-address.dto'

export class CreateCommunicationAddressDto
  extends OmitType(CommunicationAddressDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements CommunicationAddressType.Input {}
