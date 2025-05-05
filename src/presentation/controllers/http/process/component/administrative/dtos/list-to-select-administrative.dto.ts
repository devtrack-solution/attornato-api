import { OmitType } from '@nestjs/swagger';
import { CreateAdministrativeDto } from './create-administrative.dto';
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type';


export class ListToSelectAdministrativeDto
  extends OmitType(CreateAdministrativeDto, [])

  implements Partial<AdministrativeType.Input> {}
