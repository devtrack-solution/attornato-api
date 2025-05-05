import { OmitType } from '@nestjs/swagger'
import { ContactPersonDto } from '@/presentation/controllers/http/client/component/person/contact-person/dtos/contact-person.dto'
import { ContactPersonType } from '@/domain/client/component/person/contact-person/types/contact-person.type'

export class CreateContactPersonDto
  extends OmitType(ContactPersonDto, ['id', 'userId', 'freeField', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ContactPersonType.Input {}
