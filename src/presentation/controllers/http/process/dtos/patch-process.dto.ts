import { OmitType } from '@nestjs/swagger';
import { CreateProcessDto } from './create-process.dto';
import { ProcessType } from '@/domain/process/types/process.type'

export class PatchProcessDto extends OmitType(CreateProcessDto, []) implements Partial<ProcessType.Input> {}
