import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ClientType } from '@/domain/client/types/client.type'

export const ListToSelectClientInboundPortToken = Symbol.for('ListToSelectClientInboundPortToken')

export interface ListToSelectClientInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ClientType.Output[]>> {}
