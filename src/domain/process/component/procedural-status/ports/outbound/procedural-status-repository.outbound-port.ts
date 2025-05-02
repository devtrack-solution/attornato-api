import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'

export const ProceduralStatusRepositoryOutboundPortSymbol = Symbol('ProceduralStatusRepositoryOutboundPortSymbol')

export interface ProceduralStatusRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, ProceduralStatusType.Input, ProceduralStatusType.Output> {}
