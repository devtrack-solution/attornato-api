import { OmitType } from '@nestjs/swagger'
import { DetailDto } from './detail.dto'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export class CreateDetailDto extends OmitType(DetailDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements DetailType.Input {}
