import { Module } from '@nestjs/common'
import { PreferenceModule } from '@/application/services/account/component/preference/preference.module'
import { PreferenceHttpController } from '@/presentation/controllers/http/account/component/preference/preference-http.controller'

@Module({
  imports: [PreferenceModule],
  controllers: [PreferenceHttpController],
  exports: [],
})
export class PreferenceHttpControllerModule {}
