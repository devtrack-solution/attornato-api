import { Module } from '@nestjs/common'
import { PreferenceHttpControllerModule } from '@/presentation/controllers/http/account/component/preference/preference-http-controller.module'
import { AccountPersonHttpControllerModule } from '@/presentation/controllers/http/account/component/account-person/account-person-http-controller.module'

@Module({
  imports: [AccountPersonHttpControllerModule, PreferenceHttpControllerModule],
  controllers: [],
  exports: [],
})
export class AccountOrganizeControllerModule {}
