import { OmitType } from '@nestjs/swagger'
import { CreateLocalProcedureNameDto } from './create-local-procedure-name].dto'
import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'

export class PatchLocalProcedureNameDto extends OmitType(CreateLocalProcedureNameDto, []) implements Partial<LocalProcedureNameType.Input> {}
