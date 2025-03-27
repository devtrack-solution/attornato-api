import { OmitType } from '@nestjs/swagger';
import { CreateSubjectDto } from './create-subject.dto';
import { SubjectType } from '@/domain/subject/types/subject.type'


export class ListToSelectSubjectDto
  extends OmitType(CreateSubjectDto, [])

  implements Partial<SubjectType.Input> {}
