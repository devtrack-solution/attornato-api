import { IndividualType } from '@/domain/client/component/individual/types/individual.type';
import { OmitType } from '@nestjs/swagger';
import { IndividualDto } from './individual.dto';

export class CreateIndividualDto
  extends OmitType(IndividualDto, ['id', 'groupCustomer', 'profile', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements IndividualType.Input {}
