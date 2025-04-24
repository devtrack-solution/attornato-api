import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { IndividualType } from '@/domain/client/individual/types/individual.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchIndividualInboundPortToken = Symbol.for('PatchIndividualInboundPortToken')

export interface PatchIndividualInboundPort extends IServiceInboundPort<Partial<IndividualType.Input>, Criteria.ById, void> {}
