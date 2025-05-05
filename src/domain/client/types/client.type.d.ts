import { BaseType } from '@/core/domain/types/base.type'
import { PersonType } from '@/domain/client/component/person/types/person.type'

export namespace ClientType {
  export type Input = {
    person: PersonType.Input
    groupCustomerId: string
    profileId: string
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
