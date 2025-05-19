import { OmitType } from '@nestjs/swagger'
import { ContactDto } from './contact.dto'
import { ContactType } from '@/domain/client/component/person/communication-address/contact/types/contact.type'

export class CreateContactDto
  extends OmitType(ContactDto, ['id', 'userId', 'communicationChannel', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ContactType.Input {}
