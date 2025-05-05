import { OmitType } from '@nestjs/swagger'
import { ProcessDto } from './process.dto'
import { ProcessType } from '@/domain/process/types/process.type'

export class CreateProcessDto
  extends OmitType(ProcessDto, [
    'id',
    'client',
    'groupProcess',
    'actionObject',
    'county',
    'localProcedureName',
    'locator',
    'phase',
    'practiceArea',
    'subject',
    'proceduralStatus',
    'userId',
    'lastUpdatedUserId',
    'createdUserId',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'enable',
  ])
  implements ProcessType.Input {}
