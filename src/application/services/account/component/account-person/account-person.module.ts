import { PatchAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/patch-account-person.inbound-port'
import { Module } from '@nestjs/common'
import { InfrastructureModule } from '@/infrastructure/infrastructure.module'
import { ListAccountPersonInboundPortToken } from '@/domain/account/component/account-person/ports/inbound/list-account-person.inbound-port'
import { ListAccountPersonService } from '@/application/services/account/component/account-person/list-account-person.service'
import { PatchAccountPersonService } from '@/application/services/account/component/account-person/patch-account-person.service'

@Module({
  imports: [InfrastructureModule],
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
