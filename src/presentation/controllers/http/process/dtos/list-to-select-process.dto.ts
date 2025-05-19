import { OmitType } from '@nestjs/swagger'
import { CreateProcessDto } from '@/presentation/controllers/http/process/dtos/create-process.dto'
import { ProcessType } from '@/domain/process/types/process.type'

export class ListToSelectProcessDto extends OmitType(CreateProcessDto, []) implements Partial<ProcessType.Input> {}
