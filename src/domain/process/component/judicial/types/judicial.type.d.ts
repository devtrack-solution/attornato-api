import { ProcessType } from '@/domain/process/types/process.type'

export namespace JudicialType {
  export type Input = {
    cnjNumber: string
  } & ProcessType.Input

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
