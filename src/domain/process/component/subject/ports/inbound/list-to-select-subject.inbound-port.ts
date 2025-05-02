import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'

export const ListToSelectSubjectInboundPortToken = Symbol.for('ListToSelectSubjectInboundPortToken')

export interface ListToSelectSubjectInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<SubjectType.Output[]>> {}
