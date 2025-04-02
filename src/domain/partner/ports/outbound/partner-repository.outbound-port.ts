import { PartnerType } from '@/domain/partner/types/partner.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PartnerRepositoryOutboundPortSymbol = Symbol('PartnerRepositoryOutboundPortSymbol')

export interface PartnerRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, PartnerType.Input, PartnerType.Output> {}
