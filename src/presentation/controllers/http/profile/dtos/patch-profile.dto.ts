import { OmitType } from '@nestjs/swagger';
import { CreateProfileDto } from '@/presentation/controllers/http/profile/dtos/create-profile.dto'
import { ProfileType } from '@/domain/profile/types/profile.type'

export class PatchProfileDto extends OmitType(CreateProfileDto, []) implements Partial<ProfileType.Input> {}
