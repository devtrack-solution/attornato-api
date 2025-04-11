import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const CommunicationChannelRepositoryOutboundPortSymbol = Symbol('CommunicationChannelRepositoryOutboundPortSymbol')

export interface CommunicationChannelRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, CommunicationChannelType.Input, CommunicationChannelType.Output> {}
