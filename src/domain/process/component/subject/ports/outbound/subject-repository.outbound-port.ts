import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'

export const SubjectRepositoryOutboundPortSymbol = Symbol('SubjectRepositoryOutboundPortSymbol')

export interface SubjectRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, SubjectType.Input, SubjectType.Output> {}
