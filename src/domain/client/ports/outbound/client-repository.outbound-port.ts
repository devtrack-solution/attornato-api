import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import {ClientType} from "@/domain/client/types/client.type";

export const ClientRepositoryOutboundPortSymbol = Symbol('ClientRepositoryOutboundPortSymbol')

export interface ClientRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<ClientType.Input>, ClientType.Output> {}
