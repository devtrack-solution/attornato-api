import { OmitType } from '@nestjs/swagger';
import { AuthType } from '@/domain/securities/types/auth.type'
import { OnboardingDto } from '@/presentation/controllers/http/securities/auth/dtos/onboarding.dto'

export class OnboardingAuthDto
  extends OmitType(OnboardingDto, [])
  implements AuthType.Onboarding {}
