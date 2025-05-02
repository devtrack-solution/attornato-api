import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'

export const ListPracticeAreaInboundPortToken = Symbol.for('ListPracticeAreaInboundPortToken')

export interface ListPracticeAreaInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, PracticeAreaType.OutputPaginated> {}
