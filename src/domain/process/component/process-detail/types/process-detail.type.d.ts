import { BaseType } from '@/core/domain/types/base.type'

export namespace ProcessDetailType {
  export type Input = {
    detailId?: string
    freeField1Id?: string
    freeField2Id?: string
    freeField3?: string
    freeField4?: string
    freeField5?: string
    freeField6Id?: string
    originId?: string
    partnerId?: string
    prognosisId?: string
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
