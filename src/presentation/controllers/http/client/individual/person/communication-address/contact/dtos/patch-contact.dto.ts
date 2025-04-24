import { OmitType } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import { ContactType } from '@/domain/communication-address/contact/types/contact.type'

export class PatchContactDto extends OmitType(CreateContactDto, []) implements Partial<ContactType.Input> {}
