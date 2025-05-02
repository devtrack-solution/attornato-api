import { BaseType } from '@/core/domain/types/base.type'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'
import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'
import { CountyType } from '@/domain/process/component/county/types/county.type'
import { PhaseType } from '@/domain/process/component/phase/types/phase.type'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'
import { ResponsibleType } from '@/domain/process/component/responsible/types/responsible.type'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'
import { LocatorType } from '@/domain/process/component/locator/types/locator.type'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'
import { ProcessFinancialType } from '@/domain/process/component/process-financial/types/process-financial.type'
import { ProcessDetailType } from '@/domain/process/component/process-detail/types/process-detail.type'
import { ClientType } from '@/domain/client/types/client.type'

export namespace ProcessType {
  export type Input = {
    client: ClientType.Input
    processId: string
    groupProcess: GroupProcessType.Input
    folder: number
    label: string
    favorite: boolean
    processNumber: string
    localProcedureNumber: number
    localProcedureName: LocalProcedureNameType.Input
    proceduralStatus: ProceduralStatusType.Input
    county: CountyType.Input
    countyUf: string
    request: string
    note: string
    justiceSecret: boolean
    captureProcedures: boolean
    phase: PhaseType.Input
    practiceArea: PracticeAreaType.Input
    responsible: ResponsibleType.Input
    actionObject: ActionObjectType.Input
    locator: LocatorType.Input
    subject: SubjectType.Input
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
