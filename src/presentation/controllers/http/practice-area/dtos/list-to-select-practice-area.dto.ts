import { OmitType } from '@nestjs/swagger';
import { CreatePracticeAreaDto } from './create-practice-area.dto';
import { PracticeAreaType } from '@/domain/practice-area/types/practice-area.type'


export class ListToSelectPracticeAreaDto
  extends OmitType(CreatePracticeAreaDto, [])

  implements Partial<PracticeAreaType.Input> {}
