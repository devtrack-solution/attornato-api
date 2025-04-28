import { OmitType } from '@nestjs/swagger';
import { CreatePartnerDto } from '@/presentation/controllers/http/process/partner/dtos/create-partner.dto'
import { PartnerType } from '@/domain/process/partner/types/partner.type'

export class PatchPartnerDto extends OmitType(CreatePartnerDto, []) implements Partial<PartnerType.Input> {}
