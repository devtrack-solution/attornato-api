import { OmitType } from '@nestjs/swagger';
import { CreateGroupProcessDto } from '@/presentation/controllers/http/process/component/group-process/dtos/create-group-process.dto'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'

export class PatchGroupProcessDto extends OmitType(CreateGroupProcessDto, []) implements Partial<GroupProcessType.Input> {}
