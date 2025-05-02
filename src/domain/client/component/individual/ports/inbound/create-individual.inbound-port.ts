import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { IndividualType } from '@/domain/client/component/individual/types/individual.type'

export const CreateIndividualInboundPortToken = Symbol.for('CreateIndividualInboundPortToken')

export interface CreateIndividualInboundPort extends IServiceWithDataInboundPort<IndividualType.Input, undefined, IndividualType.Output> {}
