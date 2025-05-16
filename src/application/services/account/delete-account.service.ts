import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AccountRepositoryOutboundPort, AccountRepositoryOutboundPortSymbol } from '@/domain/account/ports/outbound/account-repository.outbound-port'
import { DeleteAccountInboundPort } from '@/domain/account/ports/inbound/delete-account.inbound-port'

@Injectable()
export class DeleteAccountService implements DeleteAccountInboundPort {
  constructor(
    @Inject(AccountRepositoryOutboundPortSymbol)
    private readonly accountRepository: AccountRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.accountRepository.deleteObject(criteria.id)
  }
}
