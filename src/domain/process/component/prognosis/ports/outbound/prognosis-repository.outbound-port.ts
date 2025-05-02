import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PrognosisRepositoryOutboundPortSymbol = Symbol('PrognosisRepositoryOutboundPortSymbol')

export interface PrognosisRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, PrognosisType.Input, PrognosisType.Output> {}
