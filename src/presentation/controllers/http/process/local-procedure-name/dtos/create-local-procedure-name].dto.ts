import { OmitType } from '@nestjs/swagger';
import { LocalProcedureNameDto } from './local-procedure-name.dto';
import { LocalProcedureNameType } from '@/domain/process/local-procedure-name/types/local-procedure-name.type'

export class CreateLocalProcedureNameDto
  extends OmitType(LocalProcedureNameDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements LocalProcedureNameType.Input {}
