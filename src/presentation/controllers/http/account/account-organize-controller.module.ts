import { Module } from '@nestjs/common'
import { PreferenceHttpControllerModule } from '@/presentation/controllers/http/account/component/preference/preference-http-controller.module'

@Module({
  imports: [PreferenceHttpControllerModule],
  controllers: [],
  exports: [],
})
export class AccountOrganizeControllerModule {}
