import { BaseType } from '@/core/domain/types/base.type'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'
import { CredentialType } from '@/domain/securities/types/credential.type'

export namespace AccountType {
  export type Input = {
    accountPerson: AccountPersonType.Input
    credential: CredentialType.Input
  } & BaseType.Input

  export type Output = Input

  export type OutputPaginated = {
    count: number
    limit: number
    offset: number
    data: Partial<Output[]>
  }

  export type Repository = Output

  export type RepositoryPaginated = OutputPaginated
}
