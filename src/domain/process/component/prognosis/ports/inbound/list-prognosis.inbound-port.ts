import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListPrognosisInboundPortToken = Symbol.for('ListPrognosisInboundPortToken')

export interface ListPrognosisInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PrognosisType.OutputPaginated> {}
