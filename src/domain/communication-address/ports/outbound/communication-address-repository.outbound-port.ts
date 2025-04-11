import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const CommunicationAddressRepositoryOutboundPortSymbol = Symbol('CommunicationAddressRepositoryOutboundPortSymbol')

export interface CommunicationAddressRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, CommunicationAddressType.Input, CommunicationAddressType.Output> {}
