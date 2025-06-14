import { BaseType } from '@/core/domain/types/base.type'
import { CommunicationAddressType } from '@/domain/client/component/person/communication-address/types/communication-address.type'
import { ContactPersonType } from '@/domain/client/component/person/contact-person/types/contact-person.type'

export namespace PersonType {
  export type Input = {
    clientId: string
    communicationAddress: CommunicationAddressType.Input
    contactPerson: ContactPersonType.Input
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
