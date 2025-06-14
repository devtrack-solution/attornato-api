import { Module } from '@nestjs/common'
import { PreferenceHttpControllerModule } from '@/presentation/controllers/http/account/component/preference/preference-http-controller.module'
import { AccountPersonHttpControllerModule } from '@/presentation/controllers/http/account/component/account-person/account-person-http-controller.module'
import { AccountHttpControllerModule } from '@/presentation/controllers/http/account/account-http-controller.module'
import { CredentialHttpControllerModule } from '@/presentation/controllers/http/account/component/credential/credential-http-controller.module'

@Module({
  imports: [AccountHttpControllerModule, CredentialHttpControllerModule, AccountPersonHttpControllerModule, PreferenceHttpControllerModule],
  controllers: [],
  exports: [],
})
export class AccountOrganizeControllerModule {}
