import { OmitType } from '@nestjs/swagger'
import { CreateOriginDto } from './create-origin.dto'
import { OriginType } from '@/domain/process/component/origin/types/origin.type'

export class ListToSelectOriginDto extends OmitType(CreateOriginDto, []) implements Partial<OriginType.Input> {}
