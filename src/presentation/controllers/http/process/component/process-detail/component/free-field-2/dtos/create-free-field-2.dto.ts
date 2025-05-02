import { OmitType } from '@nestjs/swagger'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'
import { FreeField2Dto } from '@/presentation/controllers/http/process/component/process-detail/component/free-field-2/dtos/free-field-2.dto'

export class CreateFreeField2Dto extends OmitType(FreeField2Dto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements FreeField2Type.Input {}
