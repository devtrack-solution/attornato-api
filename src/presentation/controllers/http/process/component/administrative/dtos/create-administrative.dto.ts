import { OmitType } from '@nestjs/swagger'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'
import { AdministrativeDto } from './administrative.dto'

export class CreateAdministrativeDto
  extends OmitType(AdministrativeDto, [
    'id',
    'client',
    'groupProcess',
    'localProcedureName',
    'proceduralStatus',
    'responsible',
    'county',
    'phase',
    'actionObject',
    'practiceArea',
    'locator',
    'subject',
    'userId',
    'lastUpdatedUserId',
    'createdUserId',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'enable',
  ])
  implements AdministrativeType.Input {}
