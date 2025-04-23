import { OmitType } from '@nestjs/swagger'
import { ContactPersonDto } from '@/presentation/controllers/http/client/legal/person/contact-person/dtos/contact-person.dto'
import { ContactPersonType } from '@/domain/client/legal/contact-person/types/contact-person.type'

export class CreateContactPersonDto
  extends OmitType(ContactPersonDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ContactPersonType.Input {}
