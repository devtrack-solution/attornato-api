import { OmitType } from '@nestjs/swagger';
import {
  CreateProceduralStatusDto
} from '@/presentation/controllers/http/process/component/procedural-status/dtos/create-procedural-status.dto'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'

export class PatchProceduralStatusDto extends OmitType(CreateProceduralStatusDto, []) implements Partial<ProceduralStatusType.Input> {}
