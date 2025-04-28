import { OmitType } from '@nestjs/swagger';
import { CreatePrognosisDto } from '@/presentation/controllers/http/process/prognosis/dtos/create-prognosis.dto'
import { PrognosisType } from '@/domain/process/prognosis/types/prognosis.type'

export class PatchPrognosisDto extends OmitType(CreatePrognosisDto, []) implements Partial<PrognosisType.Input> {}
