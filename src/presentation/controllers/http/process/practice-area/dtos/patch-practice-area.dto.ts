import { OmitType } from '@nestjs/swagger';
import { CreatePracticeAreaDto } from '@/presentation/controllers/http/process/practice-area/dtos/create-practice-area.dto'
import { PracticeAreaType } from '@/domain/process/practice-area/types/practice-area.type'

export class PatchPracticeAreaDto extends OmitType(CreatePracticeAreaDto, []) implements Partial<PracticeAreaType.Input> {}
