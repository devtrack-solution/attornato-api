import { OmitType } from '@nestjs/swagger'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'
import { PatchProcessDto } from '@/presentation/controllers/http/process/dtos/patch-process.dto'

export class PatchAdministrativeDto extends OmitType(PatchProcessDto, []) implements Partial<AdministrativeType.Input> {

}
