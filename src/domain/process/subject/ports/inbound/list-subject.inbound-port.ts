import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectType } from '@/domain/process/subject/types/subject.type'

export const ListSubjectInboundPortToken = Symbol.for('ListSubjectInboundPortToken')

export interface ListSubjectInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, SubjectType.OutputPaginated> {}
