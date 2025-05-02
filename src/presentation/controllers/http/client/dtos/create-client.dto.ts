import { OmitType } from '@nestjs/swagger';
import { ClientDto } from './client.dto';
import { ClientType } from '@/domain/client/types/client.type'

export class CreateClientDto
  extends OmitType(ClientDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ClientType.Input {}
