import { BaseType } from '@/core/domain/types/base.type'
import { ProcessFinancialType } from '@/domain/process/component/process-financial/types/process-financial.type'
import { ProcessDetailType } from '@/domain/process/component/process-detail/types/process-detail.type'

export namespace ProcessType {
  export type Input = {
    clientId: string
    processId: string
    groupProcessId: string
    folder: number
    label: string
    favorite: boolean
    processNumber: string
    localProcedureNumber: number
    localProcedureNameId: string
    proceduralStatusId: string
    countyId: string
    countyUf: string
    request: string
    note: string
    justiceSecret: boolean
    captureProcedures: boolean
    phaseId: string
    practiceAreaId: string
    responsibleId: string
    actionObjectId: string
    locatorId: string
    subjectId: string
    processFinancial: ProcessFinancialType.Input
    processDetail: ProcessDetailType.Input
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
