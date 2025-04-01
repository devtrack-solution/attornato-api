import { PrognosisType } from '@/domain/prognosis/types/prognosis.type'
import { OmitType } from '@nestjs/swagger';
import { PrognosisDto } from '@/presentation/controllers/http/prognosis/dtos/prognosis.dto'

export class CreatePrognosisDto
  extends OmitType(PrognosisDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements PrognosisType.Input {}
