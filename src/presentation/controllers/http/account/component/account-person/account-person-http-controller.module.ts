import { Module } from '@nestjs/common'
import { AccountPersonModule } from '@/application/services/account/component/account-person/account-person.module'
import { AccountPersonHttpController } from '@/presentation/controllers/http/account/component/account-person/account-person-http.controller'

@Module({
  imports: [AccountPersonModule],
  controllers: [AccountPersonHttpController],
  exports: [],
})
export class AccountPersonHttpControllerModule {}
