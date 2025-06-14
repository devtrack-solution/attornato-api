import { BaseType } from '@/core/domain/types/base.type'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'

export namespace ContactType {
  export type Input = {
    value: string
    communicationChannelId: string
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
