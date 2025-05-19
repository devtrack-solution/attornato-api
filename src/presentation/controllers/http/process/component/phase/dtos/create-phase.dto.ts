import { OmitType } from '@nestjs/swagger'
import { PhaseType } from '@/domain/process/component/phase/types/phase.type'
import { PhaseDto } from './phase.dto'

export class CreatePhaseDto extends OmitType(PhaseDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements PhaseType.Input {}
