import { Module } from '@nestjs/common'
import { AccountHttpController } from '@/presentation/controllers/http/account/account-http.controller'
import { AccountModule } from '@/application/services/account/account.module'

@Module({
  imports: [
    AccountModule
  ],
  controllers: [AccountHttpController],
  exports: [],
})
export class AccountHttpControllerModule {}
