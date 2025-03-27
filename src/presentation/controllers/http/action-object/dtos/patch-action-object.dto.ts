import { OmitType } from '@nestjs/swagger';
import { CreateActionObjectDto } from '@/presentation/controllers/http/action-object/dtos/create-action-object.dto'
import { ActionObjectType } from '@/domain/action-object/types/action-object.type'

export class PatchActionObjectDto extends OmitType(CreateActionObjectDto, []) implements Partial<ActionObjectType.Input> {}
