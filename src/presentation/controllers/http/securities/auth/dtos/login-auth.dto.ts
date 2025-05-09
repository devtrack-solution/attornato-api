import { OmitType } from '@nestjs/swagger';
import { AuthDto } from '@/presentation/controllers/http/securities/auth/dtos/auth.dto'
import { AuthType } from '@/domain/securities/types/auth.type'

export class LoginAuthDto
  extends OmitType(AuthDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable'])
  implements AuthType.LoginOutput {}
