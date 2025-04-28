import { OmitType } from '@nestjs/swagger'
import { ProfileType } from '@/domain/client/profile/types/profile.type'
import { CreateProfileDto } from '@/presentation/controllers/http/client/profile/dtos/create-profile.dto'

export class PatchProfileDto extends OmitType(CreateProfileDto, []) implements Partial<ProfileType.Input> {}
