import { OmitType } from '@nestjs/swagger';
import { CreateResponsibleDto } from './create-responsible.dto';
import { ResponsibleType } from '@/domain/process/responsible/types/responsible.type';

export class PatchResponsibleDto extends OmitType(CreateResponsibleDto, []) implements Partial<ResponsibleType.Input> {}
