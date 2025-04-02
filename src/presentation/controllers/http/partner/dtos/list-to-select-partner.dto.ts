import { OmitType } from '@nestjs/swagger';
import { CreatePartnerDto } from './create-partner.dto';
import { PartnerType } from '@/domain/partner/types/partner.type'


export class ListToSelectPartnerDto
  extends OmitType(CreatePartnerDto, [])

  implements Partial<PartnerType.Input> {}
