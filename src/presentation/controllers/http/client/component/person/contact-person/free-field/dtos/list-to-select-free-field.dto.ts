import { OmitType } from '@nestjs/swagger';
import { CreateFreeFieldDto } from './create-free-field.dto';
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'


export class ListToSelectFreeFieldDto
  extends OmitType(CreateFreeFieldDto, [])

  implements Partial<FreeFieldType.Input> {}
