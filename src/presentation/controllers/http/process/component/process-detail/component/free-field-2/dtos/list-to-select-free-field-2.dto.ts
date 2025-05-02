import { OmitType } from '@nestjs/swagger';
import { CreateFreeField2Dto } from './create-free-field-2.dto';
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type';

export class ListToSelectFreeField2Dto
  extends OmitType(CreateFreeField2Dto, [])

  implements Partial<FreeField2Type.Input> {}
