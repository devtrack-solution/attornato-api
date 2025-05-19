import { OmitType } from '@nestjs/swagger'
import { CreateResponsibleDto } from './create-responsible.dto'
import { ResponsibleType } from '@/domain/process/component/responsible/types/responsible.type'

export class ListToSelectResponsibleDto extends OmitType(CreateResponsibleDto, []) implements Partial<ResponsibleType.Input> {}
