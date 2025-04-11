import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const LoadRolesFromCredentialInboundPortToken = Symbol.for('LoadRolesFromCredentialInboundPortToken')

export interface LoadRolesFromCredentialInboundPort extends IServiceWithCriteriaInboundPort<Criteria.ById, CredentialType.Output> {}
