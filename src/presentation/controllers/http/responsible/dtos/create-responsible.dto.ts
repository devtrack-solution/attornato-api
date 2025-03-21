import { OmitType } from '@nestjs/swagger';
import { ResponsibleDto } from './responsible.dto';
import { ResponsibleType } from '@/domain/responsible/types/responsible.type';

export class CreateResponsibleDto
  extends OmitType(ResponsibleDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ResponsibleType.Input {}
