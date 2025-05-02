import { BaseType } from '@/core/domain/types/base.type'

export namespace ProcessFinancialType {
  export type Input = {
    hiring: Date
    resJudicata: Date
    closure: Date
    sentence: Date
    distribution: Date
    execution: Date
    causeValue: number
    otherValue: number
    contingency: number
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
