import { GroupProcessType } from '@/domain/group-process/types/group-process.type'
import { OmitType } from '@nestjs/swagger';
import { GroupProcessDto } from '@/presentation/controllers/http/group-process/dtos/group-process.dto'

export class CreateGroupProcessDto
  extends OmitType(GroupProcessDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements GroupProcessType.Input {}
