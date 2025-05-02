import { OmitType } from '@nestjs/swagger';
import { CreateActionObjectDto } from '@/presentation/controllers/http/process/component/action-object/dtos/create-action-object.dto'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'

export class PatchActionObjectDto extends OmitType(CreateActionObjectDto, []) implements Partial<ActionObjectType.Input> {}
