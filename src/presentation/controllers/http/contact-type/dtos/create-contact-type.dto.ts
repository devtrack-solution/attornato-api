import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'
import { OmitType } from '@nestjs/swagger';
import { ContactTypeDto } from '@/presentation/controllers/http/contact-type/dtos/contact-type.dto'

export class CreateContactTypeDto
  extends OmitType(ContactTypeDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ContactTypeType.Input {}
