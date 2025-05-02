import { OmitType } from '@nestjs/swagger';
import { CreatePrognosisDto } from './create-prognosis.dto';
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'


export class ListToSelectPrognosisDto
  extends OmitType(CreatePrognosisDto, [])

  implements Partial<PrognosisType.Input> {}
