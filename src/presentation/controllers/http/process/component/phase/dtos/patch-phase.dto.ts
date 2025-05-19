import { OmitType } from '@nestjs/swagger'
import { CreatePhaseDto } from './create-phase.dto'
import { PhaseType } from '@/domain/process/component/phase/types/phase.type'

export class PatchPhaseDto extends OmitType(CreatePhaseDto, []) implements Partial<PhaseType.Input> {}
