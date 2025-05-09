import { Module } from '@nestjs/common'
import { AuthHttpControllerModule } from '@/presentation/controllers/http/securities/auth/auth-http-controller.module'

@Module({
  imports: [AuthHttpControllerModule],
  controllers: [],
  exports: [],
})
export class AccountOrganizeControllerModule {}
