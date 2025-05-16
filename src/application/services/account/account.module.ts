import { Module } from '@nestjs/common'
import { CoreModule } from '@/core/core.module'
import { ListAccountService } from '@/application/services/account/list-account.service'
import { CreateAccountInboundPortToken } from '@/domain/account/ports/inbound/create-account.inbound-port'
import { ListAccountInboundPortToken } from '@/domain/account/ports/inbound/list-account.inbound-port'
import { ListToSelectAccountInboundPortToken } from '@/domain/account/ports/inbound/list-to-select-account.inbound-port'
import { DeleteAccountInboundPortToken } from '@/domain/account/ports/inbound/delete-account.inbound-port'
import { CreateAccountService } from '@/application/services/account/create-account.service'
import { DeleteAccountService } from '@/application/services/account/delete-account.service'
import { ListToSelectAccountService } from '@/application/services/account/list-to-select-account.service'

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [
    {
      provide: CreateAccountInboundPortToken,
      useClass: CreateAccountService,
    },
    {
      provide: DeleteAccountInboundPortToken,
      useClass: DeleteAccountService,
    },
    {
      provide: ListAccountInboundPortToken,
      useClass: ListAccountService,
    },
    {
      provide: ListToSelectAccountInboundPortToken,
      useClass: ListToSelectAccountService,
    },
  ],
  exports: [
    {
      provide: CreateAccountInboundPortToken,
      useClass: CreateAccountService,
    },
    {
      provide: DeleteAccountInboundPortToken,
      useClass: DeleteAccountService,
    },
    {
      provide: ListAccountInboundPortToken,
      useClass: ListAccountService,
    },
    {
      provide: ListToSelectAccountInboundPortToken,
      useClass: ListToSelectAccountService,
    },
  ],
})
export class AccountModule {}
