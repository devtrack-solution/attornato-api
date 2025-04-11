import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const CredentialRepositoryOutboundPortSymbol = Symbol('CredentialRepositoryOutboundPortSymbol')

export interface CredentialRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<CredentialType.Input>, CredentialType.Output> {}
