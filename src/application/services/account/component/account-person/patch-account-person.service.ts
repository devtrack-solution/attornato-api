import { AccountPerson } from '@/domain/account/component/account-person/business-objects/account-person.bo'
import { Inject, Injectable } from '@nestjs/common'
import { PatchAccountPersonInboundPort } from '@/domain/account/component/account-person/ports/inbound/patch-account-person.inbound-port'
import { AccountPersonRepositoryOutboundPort, AccountPersonRepositoryOutboundPortSymbol } from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class PatchAccountPersonService implements PatchAccountPersonInboundPort {
  constructor(
    @Inject(AccountPersonRepositoryOutboundPortSymbol)
    private readonly accountPersonRepository: AccountPersonRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<AccountPersonType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.accountPersonRepository.patchObject(data, criteria, AccountPerson, relations)
  }
}
