import { OmitType } from '@nestjs/swagger';
import { FreeFieldType } from '@/domain/free-field/types/free-field.type'
import { FreeFieldDto } from '@/presentation/controllers/http/free-field/dtos/free-field.dto'

export class CreateFreeFieldDto
  extends OmitType(FreeFieldDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements FreeFieldType.Input {}
