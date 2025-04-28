import { OmitType } from '@nestjs/swagger';
import { CreateDetailsDto } from './create-details.dto';
import { DetailsType } from '@/domain/process/details/types/details.type'


export class ListToSelectDetailsDto
  extends OmitType(CreateDetailsDto, [])

  implements Partial<DetailsType.Input> {}
