import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { OmitType } from '@nestjs/swagger'
import { ProfileDto } from '@/presentation/controllers/http/client/component/profile/dtos/profile.dto'

export class CreateProfileDto extends OmitType(ProfileDto, ['userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements ProfileType.Input {}
