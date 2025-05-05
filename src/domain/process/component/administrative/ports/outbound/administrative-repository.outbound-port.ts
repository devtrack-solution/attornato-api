import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'

export const AdministrativeRepositoryOutboundPortSymbol = Symbol('AdministrativeRepositoryOutboundPortSymbol')

export interface AdministrativeRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<AdministrativeType.Input>, AdministrativeType.Output> {}
