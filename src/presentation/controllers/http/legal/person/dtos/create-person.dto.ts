import { PersonType } from '@/domain/legal/types/person.type';
import { OmitType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class CreatePersonDto
  extends OmitType(PersonDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements PersonType.Input {}
