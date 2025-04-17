
import { OmitType } from '@nestjs/swagger';
import { ContactPersonLegalType } from '@/domain/legal/contact-person-legal/types/contact-person-legal.type'
import {
  ContactPersonLegalDto
} from '@/presentation/controllers/http/legal/person/contact-person-legal/dtos/contact-person-legal.dto'

export class CreateContactPersonLegalDto
  extends OmitType(ContactPersonLegalDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ContactPersonLegalType.Input {}
