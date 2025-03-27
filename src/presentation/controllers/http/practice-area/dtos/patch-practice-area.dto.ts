import { OmitType } from '@nestjs/swagger';
import { CreatePracticeAreaDto } from '@/presentation/controllers/http/practice-area/dtos/create-practice-area.dto'
import { PracticeAreaType } from '@/domain/practice-area/types/practice-area.type'

export class PatchPracticeAreaDto extends OmitType(CreatePracticeAreaDto, []) implements Partial<PracticeAreaType.Input> {}
