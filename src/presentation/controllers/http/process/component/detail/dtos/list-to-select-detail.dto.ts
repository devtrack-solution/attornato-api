import { OmitType } from '@nestjs/swagger';
import { CreateDetailDto } from './create-detail.dto';
import { DetailType } from '@/domain/process/component/detail/types/detail.type'


export class ListToSelectDetailDto
  extends OmitType(CreateDetailDto, [])

  implements Partial<DetailType.Input> {}
