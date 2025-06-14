import { OmitType } from '@nestjs/swagger'
import { ProcessDetailType } from '@/domain/process/component/process-detail/types/process-detail.type'
import { ProcessDetailDto } from '@/presentation/controllers/http/process/component/process-detail/dtos/process-detail.dto'

export class CreateProcessDetailDto
  extends OmitType(ProcessDetailDto, [
    'id',
    'freeField1',
    'freeField2',
    'freeField6',
    'detail',
    'prognosis',
    'partner',
    'origin',
    'userId',
    'lastUpdatedUserId',
    'createdUserId',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'enable',
  ])
  implements ProcessDetailType.Input {}
