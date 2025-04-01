import { OmitType } from '@nestjs/swagger';
import { CreatePrognosisDto } from '@/presentation/controllers/http/prognosis/dtos/create-prognosis.dto'
import { PrognosisType } from '@/domain/prognosis/types/prognosis.type'

export class PatchPrognosisDto extends OmitType(CreatePrognosisDto, []) implements Partial<PrognosisType.Input> {}
