import { OmitType } from '@nestjs/swagger';
import { PracticeAreaType } from '@/domain/process/practice-area/types/practice-area.type'
import { PracticeAreaDto } from '@/presentation/controllers/http/process/practice-area/dtos/practice-area.dto'

export class CreatePracticeAreaDto
  extends OmitType(PracticeAreaDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements PracticeAreaType.Input {}
