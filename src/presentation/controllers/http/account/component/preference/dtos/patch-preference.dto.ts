import { OmitType } from '@nestjs/swagger'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'
import { CreatePreferenceDto } from '@/presentation/controllers/http/account/component/preference/dtos/create-preference.dto'

export class PatchPreferenceDto extends OmitType(CreatePreferenceDto, []) implements Partial<PreferenceType.Input> {}
