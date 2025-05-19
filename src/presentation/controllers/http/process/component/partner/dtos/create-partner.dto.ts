import { PartnerType } from '@/domain/process/component/partner/types/partner.type'
import { OmitType } from '@nestjs/swagger'
import { PartnerDto } from '@/presentation/controllers/http/process/component/partner/dtos/partner.dto'

export class CreatePartnerDto extends OmitType(PartnerDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements PartnerType.Input {}
