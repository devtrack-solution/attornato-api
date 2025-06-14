import { LocatorType } from '@/domain/process/component/locator/types/locator.type'
import { OmitType } from '@nestjs/swagger'
import { CreateLocalProcedureNameDto } from './create-local-procedure-name].dto'

export class ListToSelectLocalProcedureNameDto extends OmitType(CreateLocalProcedureNameDto, []) implements Partial<LocatorType.Input> {}
