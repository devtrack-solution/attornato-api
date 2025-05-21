import { OmitType } from '@nestjs/swagger'
import { ProcessType } from '@/domain/process/types/process.type'
import {ProcessDto} from "@/presentation/controllers/http/process/dtos/process.dto";

export class PatchProcessDto
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
