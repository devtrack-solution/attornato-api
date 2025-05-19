import { OmitType } from '@nestjs/swagger'
import { CreateCountyDto } from './create-county.dto'
import { CountyType } from '@/domain/process/component/county/types/county.type'

export class PatchCountyDto extends OmitType(CreateCountyDto, []) implements Partial<CountyType.Input> {}
