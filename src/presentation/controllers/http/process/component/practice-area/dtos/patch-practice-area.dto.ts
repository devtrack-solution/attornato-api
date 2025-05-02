import { OmitType } from '@nestjs/swagger';
import { CreatePracticeAreaDto } from '@/presentation/controllers/http/process/component/practice-area/dtos/create-practice-area.dto'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'

export class PatchPracticeAreaDto extends OmitType(CreatePracticeAreaDto, []) implements Partial<PracticeAreaType.Input> {}
