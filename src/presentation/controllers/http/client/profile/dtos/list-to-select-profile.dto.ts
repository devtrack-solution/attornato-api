import { OmitType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { ProfileType } from '@/domain/client/profile/types/profile.type'

export class ListToSelectProfileDto
  extends OmitType(CreateProfileDto, [])

  implements Partial<ProfileType.Input> {}
