import { BaseType } from '@/core/domain/types/base.type'

export namespace PreferenceType {
  export type Input = {
    accountId: string
    key: string
    value: string
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
