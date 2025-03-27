import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectType } from '@/domain/subject/types/subject.type'

export const PatchSubjectInboundPortToken = Symbol.for('PatchSubjectInboundPortToken')

export interface PatchSubjectInboundPort extends IServiceInboundPort<Partial<SubjectType.Input>, Criteria.ById, void> {}
