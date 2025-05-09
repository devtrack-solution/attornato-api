import { PatchAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/patch-account-person.inbound-port'
import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { ListAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/list-account-person.inbound-port'
import { ListAccountPersonService } from '@/application/services/account/component/account-person/list-account-person.service'
import { PatchAccountPersonService } from '@/application/services/account/component/account-person/patch-account-person.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    // {
    //   provide: CreateAccountPersonInboundPortToken,
    //   useClass: CreateAccountPersonService,
    // },
    // {
    //   provide: DeleteAccountPersonInboundPortToken,
    //   useClass: DeleteAccountPersonService,
    // },
    {
      provide: ListAccountPersonInboundPortToken,
      useClass: ListAccountPersonService,
    },
    {
      provide: PatchAccountPersonInboundPortToken,
      useClass: PatchAccountPersonService,
    },
  ],
  exports: [
    // {
    //   provide: CreateAccountPersonInboundPortToken,
    //   useClass: CreateAccountPersonService,
    // },
    // {
    //   provide: DeleteAccountPersonInboundPortToken,
    //   useClass: DeleteAccountPersonService,
    // },
    {
      provide: ListAccountPersonInboundPortToken,
      useClass: ListAccountPersonService,
    },
    {
      provide: PatchAccountPersonInboundPortToken,
      useClass: PatchAccountPersonService,
    },
  ],
})
export class AccountPersonModule {}
