import { ContactPersonLegalType } from '@/domain/legal/contact-person-legal/types/contact-person-legal.type';
import { OmitType } from '@nestjs/swagger';
import { CreateContactPersonLegalDto } from './create-contact-person-legal.dto';


export class ListToSelectContactPersonLegalDto
  extends OmitType(CreateContactPersonLegalDto, [])

  implements Partial<ContactPersonLegalType.Input> {}
