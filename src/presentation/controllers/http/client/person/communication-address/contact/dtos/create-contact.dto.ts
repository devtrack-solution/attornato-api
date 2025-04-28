import { OmitType } from '@nestjs/swagger'
import { ContactDto } from './contact.dto'
import { ContactType } from '@/domain/client/person/communication-address/contact/types/contact.type'

export class CreateContactDto extends OmitType(ContactDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements ContactType.Input {}
