import { LegalType } from '@/domain/client/legal/types/legal.type';
import { OmitType } from '@nestjs/swagger';
import { LegalDto } from './legal.dto';

export class CreateLegalDto
  extends OmitType(LegalDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements LegalType.Input {}
