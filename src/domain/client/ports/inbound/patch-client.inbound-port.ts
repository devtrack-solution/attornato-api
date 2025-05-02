import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ClientType } from '@/domain/client/types/client.type'

export const PatchClientInboundPortToken = Symbol.for('PatchClientInboundPortToken')

export interface PatchClientInboundPort extends IServiceInboundPort<Partial<ClientType.Input>, Criteria.ById, void> {}
