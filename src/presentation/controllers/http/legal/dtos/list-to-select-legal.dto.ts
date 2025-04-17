import { LegalType } from '@/domain/legal/types/legal.type';
import { OmitType } from '@nestjs/swagger';
import { CreateLegalDto } from './create-legal.dto';


export class ListToSelectLegalDto
  extends OmitType(CreateLegalDto, [])

  implements Partial<LegalType.Input> {}
