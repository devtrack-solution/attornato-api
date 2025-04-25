import { OmitType } from '@nestjs/swagger'
import { PersonDto } from './person.dto'
import { PersonType } from '@/domain/client/person/types/person.type'

export class CreatePersonDto extends OmitType(PersonDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements PersonType.Input {}
