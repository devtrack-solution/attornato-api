import { BaseType } from '@/core/domain/types/base.type'

export namespace AccountPersonType {
  export type Input = {
    name: string
    birthday: Date
    nickName?: string
    gender?: string
    avatar?: string
    governanceSocialIdentity?: string
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
