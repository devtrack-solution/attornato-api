// import { Inject, Injectable } from '@nestjs/common'
// import { Criteria } from '@/core/domain/types/criteria.type'
// import { DeleteAccountPersonInboundPort } from '@/domain/account/component/account-person/ports/inbound/delete-account-person.inbound-port'
// import { AccountPersonRepositoryOutboundPort, AccountPersonRepositoryOutboundPortSymbol } from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
//
// @Injectable()
// export class DeleteAccountPersonService implements DeleteAccountPersonInboundPort {
//   constructor(
//     @Inject(AccountPersonRepositoryOutboundPortSymbol)
//     private readonly accountPersonRepository: AccountPersonRepositoryOutboundPort,
//   ) {}
//
//  async execute(criteria: Criteria.ById): Promise<void> {
//     await this.accountPersonRepository.deleteObject(criteria.id)
//   }
// }
