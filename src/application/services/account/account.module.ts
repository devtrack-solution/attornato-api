import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { CreateProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/create-profile.inbound-port'
import { DeleteProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/delete-profile.inbound-port'
import { CreateProfileService } from '@/application/services/client/component/profile/create-profile.service'
import { DeleteProfileService } from '@/application/services/client/component/profile/delete-profile.service'
import { ListProfileService } from '@/application/services/client/component/profile/list-profile.service'
import { ListProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/list-profile.inbound-port'
import { ListToSelectProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/list-to-select-profile.inbound-port'
import { ListToSelectProfileService } from '@/application/services/client/component/profile/list-to-select-profile.service'
import { PatchProfileInboundPortToken } from '@/domain/client/component/profile/ports/inbound/patch-profile.inbound-port'
import { PatchProfileService } from '@/application/services/client/component/profile/patch-profile.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateProfileInboundPortToken,
      useClass: CreateProfileService,
    },
    {
      provide: DeleteProfileInboundPortToken,
      useClass: DeleteProfileService,
    },
    {
      provide: ListProfileInboundPortToken,
      useClass: ListProfileService,
    },
    {
      provide: ListToSelectProfileInboundPortToken,
      useClass: ListToSelectProfileService,
    },
    {
      provide: PatchProfileInboundPortToken,
      useClass: PatchProfileService,
    },
  ],
  exports: [
    {
      provide: CreateProfileInboundPortToken,
      useClass: CreateProfileService,
    },
    {
      provide: DeleteProfileInboundPortToken,
      useClass: DeleteProfileService,
    },
    {
      provide: ListProfileInboundPortToken,
      useClass: ListProfileService,
    },
    {
      provide: ListToSelectProfileInboundPortToken,
      useClass: ListToSelectProfileService,
    },
    {
      provide: PatchProfileInboundPortToken,
      useClass: PatchProfileService,
    },
  ],
})
export class ProfileModule {}
