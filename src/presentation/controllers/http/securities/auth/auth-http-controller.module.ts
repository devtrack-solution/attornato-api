import { Module } from '@nestjs/common'
import { AuthHttpController } from '@/presentation/controllers/http/securities/auth/auth-http.controller'
import { SecurityModule } from '@/application/services/securities/security.module'

@Module({
  imports: [SecurityModule],
  controllers: [AuthHttpController],
  exports: [],
})
export class AuthHttpControllerModule {}
