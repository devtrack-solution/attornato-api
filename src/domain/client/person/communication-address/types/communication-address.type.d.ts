import { BaseType } from '@/core/domain/types/base.type'
import { ContactType } from '@/domain/client/person/communication-address/contact/types/contact.type'

export namespace CommunicationAddressType {
  export type Input = {
    zipCode: string
    street: string
    neighborhood: string
    city: string
    state: string
    contacts: ContactType.Input[]
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
