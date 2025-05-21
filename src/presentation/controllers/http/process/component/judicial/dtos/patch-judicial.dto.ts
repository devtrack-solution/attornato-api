import { OmitType } from '@nestjs/swagger'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'
import { PatchProcessDto } from '@/presentation/controllers/http/process/dtos/patch-process.dto'

export class PatchJudicialDto extends OmitType(PatchProcessDto, []) implements Partial<JudicialType.Input> {}
