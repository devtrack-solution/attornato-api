import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { SubjectType } from '@/domain/subject/types/subject.type'

export const CreateSubjectInboundPortToken = Symbol.for('CreateSubjectInboundPortToken')

export interface CreateSubjectInboundPort extends IServiceWithDataInboundPort<SubjectType.Input, undefined, SubjectType.Output> {}
