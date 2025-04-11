import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalType } from '@/domain/legal/types/legal.type'

export const CreateLegalInboundPortToken = Symbol.for('CreateLegalInboundPortToken')

export interface CreateLegalInboundPort extends IServiceWithDataInboundPort<LegalType.Input, undefined, LegalType.Output> {}
