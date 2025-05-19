import { OmitType } from '@nestjs/swagger'
import { ActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/action-object.dto'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'

export class CreateActionObjectDto extends OmitType(ActionObjectDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements GroupProcessType.Input {}
