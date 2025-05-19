import { Module } from '@nestjs/common'
import { PreferenceModule } from '@/application/services/account/component/preference/preference.module'

@Module({
  imports: [PreferenceModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AccountOrganizeModule {}
