import { OmitType } from '@nestjs/swagger';
import { CreateJudicialDto } from './create-judicial.dto';
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type';


export class ListToSelectJudicialDto
  extends OmitType(CreateJudicialDto, [])

  implements Partial<JudicialType.Input> {}
