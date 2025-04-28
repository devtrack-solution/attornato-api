import { OmitType } from '@nestjs/swagger';
import { FreeFieldType } from '@/domain/client/person/contact-person/free-field/types/free-field.type'
import { FreeFieldDto } from '@/presentation/controllers/http/client/person/contact-person/free-field/dtos/free-field.dto'

export class CreateFreeFieldDto
  extends OmitType(FreeFieldDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements FreeFieldType.Input {}
