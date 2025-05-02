import { OmitType } from '@nestjs/swagger'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'
import { FreeField6Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-6/dtos/free-field-6.dto'

export class CreateFreeField6Dto extends OmitType(FreeField6Dto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements FreeField6Type.Input {}
