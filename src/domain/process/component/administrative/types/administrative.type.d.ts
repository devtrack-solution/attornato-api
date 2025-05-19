import { ProcessType } from '@/domain/process/types/process.type'

export namespace AdministrativeType {
  export type Input = {
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
