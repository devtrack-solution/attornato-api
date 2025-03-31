import { OmitType } from '@nestjs/swagger';
import { CreateContactTypeDto } from './create-contact-type.dto';
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'


export class ListToSelectContactTypeDto
  extends OmitType(CreateContactTypeDto, [])

  implements Partial<ContactTypeType.Input> {}
