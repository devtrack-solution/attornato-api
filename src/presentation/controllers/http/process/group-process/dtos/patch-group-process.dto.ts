import { OmitType } from '@nestjs/swagger';
import { CreateGroupProcessDto } from '@/presentation/controllers/http/process/group-process/dtos/create-group-process.dto'
import { GroupProcessType } from '@/domain/process/group-process/types/group-process.type'

export class PatchGroupProcessDto extends OmitType(CreateGroupProcessDto, []) implements Partial<GroupProcessType.Input> {}
