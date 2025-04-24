import { OmitType } from '@nestjs/swagger';
import { CreateContactPersonDto } from './create-contact-person.dto';
import { ContactPersonType } from '@/domain/client/individual/contact-person/types/contact-person.type'

export class PatchContactPersonDto extends OmitType(CreateContactPersonDto, []) implements Partial<ContactPersonType.Input> {}
