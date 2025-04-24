import { OmitType } from '@nestjs/swagger';
import { IdentifierType } from '@/domain/client/identifier/types/identifier.type';
import { IdentifierDto } from './identifier.dto';

export class CreateIdentifierDto
  extends OmitType(IdentifierDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements IdentifierType.Input {}
