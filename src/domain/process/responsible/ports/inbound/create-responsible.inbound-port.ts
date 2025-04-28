import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ResponsibleType } from '../../types/responsible.type'

export const CreateResponsibleInboundPortToken = Symbol.for('CreateResponsibleInboundPortToken')

export interface CreateResponsibleInboundPort extends IServiceWithDataInboundPort<ResponsibleType.Input, undefined, ResponsibleType.Output> {}
