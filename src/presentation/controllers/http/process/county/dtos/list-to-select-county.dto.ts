import { CountyType } from '@/domain/process/county/types/county.type';
import { OmitType } from '@nestjs/swagger';
import { CreateCountyDto } from './create-county.dto';


export class ListToSelectCountyDto
  extends OmitType(CreateCountyDto, [])

  implements Partial<CountyType.Input> {}
