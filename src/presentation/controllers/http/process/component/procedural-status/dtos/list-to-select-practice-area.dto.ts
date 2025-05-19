import { OmitType } from '@nestjs/swagger'
import { CreateProceduralStatusDto } from './create-procedural-status.dto'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'

export class ListToSelectProceduralStatusDto extends OmitType(CreateProceduralStatusDto, []) implements Partial<ProceduralStatusType.Input> {}
