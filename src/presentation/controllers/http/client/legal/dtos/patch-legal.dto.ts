import { OmitType } from '@nestjs/swagger';
import { CreateLegalDto } from './create-legal.dto';
import { LegalType } from '@/domain/client/component/legal/types/legal.type';

export class PatchLegalDto extends OmitType(CreateLegalDto, []) implements Partial<LegalType.Input> {}
