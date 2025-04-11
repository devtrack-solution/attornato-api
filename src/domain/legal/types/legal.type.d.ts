import { BaseType } from '@/core/domain/types/base.type'
import { CommunicationAddress } from '@/domain/legal/communication-address/business-objects/communication-address.bo'

export namespace LegalType {
  export type Input = {
    legalData: LegalData
    communicationAddress: CommunicationAddress
    contactPerson: ContactPerson
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
