import { OmitType } from '@nestjs/swagger'
import { AuthType } from '@/domain/securities/types/auth.type'
import { LoginDto } from '@/presentation/controllers/http/securities/auth/dtos/login.dto'

export class LoginAuthDto extends OmitType(LoginDto, ['id', 'userId', 'lastUpdatedUserId', 'createdUserId', 'createdAt', 'updatedAt', 'deletedAt', 'enable']) implements AuthType.LoginOutput {}
