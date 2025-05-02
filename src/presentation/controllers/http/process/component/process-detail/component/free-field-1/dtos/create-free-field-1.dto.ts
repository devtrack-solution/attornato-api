import { OmitType } from '@nestjs/swagger';
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type';
import { FreeField1Dto } from './free-field-1.dto';

export class CreateFreeField1Dto
  extends OmitType(FreeField1Dto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements FreeField1Type.Input {}
