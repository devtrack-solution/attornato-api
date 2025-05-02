import { OmitType } from '@nestjs/swagger';
import { CreatePrognosisDto } from '@/presentation/controllers/http/process/component/prognosis/dtos/create-prognosis.dto'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'

export class PatchPrognosisDto extends OmitType(CreatePrognosisDto, []) implements Partial<PrognosisType.Input> {}
