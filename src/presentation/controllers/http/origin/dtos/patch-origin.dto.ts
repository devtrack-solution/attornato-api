import { OmitType } from '@nestjs/swagger';
import { CreateOriginDto } from './create-origin.dto';
import { OriginType } from '@/domain/origin/types/origin.type'

export class PatchOriginDto extends OmitType(CreateOriginDto, []) implements Partial<OriginType.Input> {}
