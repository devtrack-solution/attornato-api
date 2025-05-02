import { OmitType } from '@nestjs/swagger';
import { CreateFreeField1Dto } from './create-free-field-1.dto';
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type';

export class ListToSelectFreeField1Dto
  extends OmitType(CreateFreeField1Dto, [])

  implements Partial<FreeField1Type.Input> {}
