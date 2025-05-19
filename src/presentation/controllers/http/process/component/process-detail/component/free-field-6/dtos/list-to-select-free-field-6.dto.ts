import { OmitType } from '@nestjs/swagger'
import { CreateFreeField6Dto } from './create-free-field-6.dto'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export class ListToSelectFreeField6Dto extends OmitType(CreateFreeField6Dto, []) implements Partial<FreeField6Type.Input> {}
