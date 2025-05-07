import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'
import { OmitType } from '@nestjs/swagger';
import { PreferenceDto } from '@/presentation/controllers/http/account/component/preference/dtos/preference.dto'

export class CreatePreferenceDto
  extends OmitType(PreferenceDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements PreferenceType.Input {}
