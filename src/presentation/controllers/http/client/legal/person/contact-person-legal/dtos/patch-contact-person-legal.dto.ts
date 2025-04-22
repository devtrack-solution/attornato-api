import { OmitType } from '@nestjs/swagger';
import { CreateContactPersonLegalDto } from './create-contact-person-legal.dto';
import { ContactPersonLegalType } from '@/domain/client/legal/contact-person-legal/types/contact-person-legal.type'

export class PatchContactPersonLegalDto extends OmitType(CreateContactPersonLegalDto, []) implements Partial<ContactPersonLegalType.Input> {}
