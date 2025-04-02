import { PartnerType } from '@/domain/partner/types/partner.type'
import { OmitType } from '@nestjs/swagger';
import { PartnerDto } from '@/presentation/controllers/http/partner/dtos/partner.dto'

export class CreatePartnerDto
  extends OmitType(PartnerDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements PartnerType.Input {}
