import { OmitType } from '@nestjs/swagger';
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type';
import { JudicialDto } from './judicial.dto';

export class CreateJudicialDto
  extends OmitType(JudicialDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements JudicialType.Input {}
