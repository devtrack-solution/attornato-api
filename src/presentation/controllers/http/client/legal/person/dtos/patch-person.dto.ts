import { OmitType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';
import { PersonType } from '@/domain/client/legal/person/types/person.type'

export class PatchPersonDto extends OmitType(CreatePersonDto, []) implements Partial<PersonType.Input> {}
