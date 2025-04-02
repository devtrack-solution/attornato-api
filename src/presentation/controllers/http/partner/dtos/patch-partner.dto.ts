import { OmitType } from '@nestjs/swagger';
import { CreatePartnerDto } from '@/presentation/controllers/http/partner/dtos/create-partner.dto'
import { PartnerType } from '@/domain/partner/types/partner.type'

export class PatchPartnerDto extends OmitType(CreatePartnerDto, []) implements Partial<PartnerType.Input> {}
