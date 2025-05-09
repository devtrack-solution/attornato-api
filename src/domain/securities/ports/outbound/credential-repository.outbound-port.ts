import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AuthType } from '@/domain/securities/types/auth.type'
import { CredentialEntity } from '@/infrastructure/adapters/pgsql/entities/credential.entity'

export const CredentialRepositoryOutboundPortSymbol = Symbol('CredentialRepositoryOutboundPortSymbol')

export interface CredentialRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, Partial<CredentialType.Input>, CredentialType.Output> {
  login(props: AuthType.LoginOutput, relations?: string[]): Promise<Partial<CredentialEntity> | null>
}
