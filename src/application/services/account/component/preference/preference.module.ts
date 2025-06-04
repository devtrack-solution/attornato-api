import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { CreatePreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/create-preference.inbound-port'
import { DeletePreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/delete-preference.inbound-port'
import { CreatePreferenceService } from '@/application/services/account/component/preference/create-preference.service'
import { DeletePreferenceService } from '@/application/services/account/component/preference/delete-preference.service'
import { ListPreferenceService } from '@/application/services/account/component/preference/list-preference.service'
import { ListPreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/list-preference.inbound-port'
import { PatchPreferenceInboundPortToken } from '@/domain/account/component/preference/ports/inbound/patch-preference.inbound-port'
import { PatchPreferenceService } from '@/application/services/account/component/preference/patch-preference.service'

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CreatePreferenceInboundPortToken,
      useClass: CreatePreferenceService,
    },
    {
      provide: DeletePreferenceInboundPortToken,
      useClass: DeletePreferenceService,
    },
    {
      provide: ListPreferenceInboundPortToken,
      useClass: ListPreferenceService,
    },
    {
      provide: PatchPreferenceInboundPortToken,
      useClass: PatchPreferenceService,
    },
  ],
  exports: [
    {
      provide: CreatePreferenceInboundPortToken,
      useClass: CreatePreferenceService,
    },
    {
      provide: DeletePreferenceInboundPortToken,
      useClass: DeletePreferenceService,
    },
    {
      provide: ListPreferenceInboundPortToken,
      useClass: ListPreferenceService,
    },
    {
      provide: PatchPreferenceInboundPortToken,
      useClass: PatchPreferenceService,
    },
  ],
})
export class PreferenceModule {}
