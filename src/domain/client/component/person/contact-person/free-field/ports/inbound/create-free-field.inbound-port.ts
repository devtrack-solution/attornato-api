import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'

export const CreateFreeFieldInboundPortToken = Symbol.for('CreateFreeFieldInboundPortToken')

export interface CreateFreeFieldInboundPort extends IServiceWithDataInboundPort<FreeFieldType.Input, undefined, FreeFieldType.Output> {}
