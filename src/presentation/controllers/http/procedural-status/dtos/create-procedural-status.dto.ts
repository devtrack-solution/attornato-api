import { OmitType } from '@nestjs/swagger';
import { ProceduralStatusDto } from '@/presentation/controllers/http/procedural-status/dtos/procedural-status.dto'
import { ProceduralStatusType } from '@/domain/procedural-status/types/procedural-status.type'

export class CreateProceduralStatusDto
  extends OmitType(ProceduralStatusDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ProceduralStatusType.Input {}
