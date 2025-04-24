import { IndividualType } from '@/domain/client/individual/types/individual.type';
import { OmitType } from '@nestjs/swagger';
import { IndividualDto } from './individual.dto';

export class CreateIndividualDto
  extends OmitType(IndividualDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements IndividualType.Input {}
