import { BaseType } from '@/core/domain/types/base.type'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'
import { OriginType } from '@/domain/process/component/origin/types/origin.type'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'

export namespace ProcessDetailType {
  export type Input = {
    detail: DetailType.Input
    freeField1: FreeField1Type.Input
    freeField2: FreeField2Type.Input
    freeField3: string
    freeField4: string
    freeField5: string
    freeField6: FreeField6Type.Input
    origin: OriginType.Input
    partner: PartnerType.Input
    prognosis: PrognosisType.Input
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
