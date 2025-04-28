import { LocatorType } from '@/domain/process/locator/types/locator.type';
import { OmitType } from '@nestjs/swagger';
import { CreateLocatorDto } from './create-locator.dto';


export class ListToSelectLocatorDto
  extends OmitType(CreateLocatorDto, [])

  implements Partial<LocatorType.Input> {}
