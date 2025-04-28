import { PartnerType } from '@/domain/process/partner/types/partner.type'
import { OmitType } from '@nestjs/swagger';
import { PartnerDto } from '@/presentation/controllers/http/process/partner/dtos/partner.dto'

export class CreatePartnerDto
  extends OmitType(PartnerDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements PartnerType.Input {}
