import { BaseType } from '@/core/domain/types/base.type'
import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type'
import { ContactPersonLegalType } from '@/domain/legal/contact-person-legal/types/contact-person-legal.type'

export namespace PersonType {
  export type Input = {
    clientId: string
    communicationAddress: CommunicationAddressType.Input
    contactPersonLegal: ContactPersonLegalType.Input
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
