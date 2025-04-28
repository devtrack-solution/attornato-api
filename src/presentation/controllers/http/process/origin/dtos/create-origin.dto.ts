import { OmitType } from '@nestjs/swagger';
import { OriginDto } from './origin.dto';
import { OriginType } from '@/domain/process/origin/types/origin.type'

export class CreateOriginDto
  extends OmitType(OriginDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements OriginType.Input {}
