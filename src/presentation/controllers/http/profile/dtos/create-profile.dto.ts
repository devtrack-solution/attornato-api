import { ProfileType } from '@/domain/profile/types/profile.type'
import { OmitType } from '@nestjs/swagger';
import { ProfileDto } from '@/presentation/controllers/http/profile/dtos/profile.dto'

export class CreateProfileDto
  extends OmitType(ProfileDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements ProfileType.Input {}
