import { OmitType } from '@nestjs/swagger';
import { CreateGroupProcessDto } from './create-group-process.dto';
import { GroupProcessType } from '@/domain/process/group-process/types/group-process.type'


export class ListToSelectGroupProcessDto
  extends OmitType(CreateGroupProcessDto, [])

  implements Partial<GroupProcessType.Input> {}
