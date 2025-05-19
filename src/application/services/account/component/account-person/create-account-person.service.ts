// import { AccountPerson } from '@/domain/account/component/account-person/business-objects/account-person.bo'
// import { Inject, Injectable } from '@nestjs/common'
// import { CreateAccountPersonInboundPort } from '@/domain/account/component/account-person/ports/inbound/create-account-person.inbound-port'
// import { AccountPersonRepositoryOutboundPort, AccountPersonRepositoryOutboundPortSymbol } from '@/domain/account/component/account-person/ports/outbound/account-person-repository.outbound-port'
// import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'
//
// @Injectable()
// export class CreateAccountPersonService implements CreateAccountPersonInboundPort {
//   constructor(
//     @Inject(AccountPersonRepositoryOutboundPortSymbol)
//     private readonly accountPersonRepository: AccountPersonRepositoryOutboundPort,
//   ) {}
//
//  async execute(data: AccountPersonType.Input): Promise<AccountPersonType.Output> {
//     let accountPerson = new AccountPerson(data)
//     await this.accountPersonRepository.saveObject(accountPerson.toPersistence())
//     return accountPerson.toJson()
//   }
// }
