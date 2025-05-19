import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { CredentialType } from '@/domain/securities/types/credential.type'

export const PatchCredentialInboundPortToken = Symbol.for('PatchCredentialInboundPortToken')

export interface PatchCredentialInboundPort extends IServiceInboundPort<Partial<CredentialType.Input>, Criteria.ById, void> {}
