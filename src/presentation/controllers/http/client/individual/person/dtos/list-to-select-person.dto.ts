import { PersonType } from '@/domain/client/individual/person/types/person.type';
import { OmitType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';


export class ListToSelectPersonDto
  extends OmitType(CreatePersonDto, [])

  implements Partial<PersonType.Input> {}
