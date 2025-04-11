import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'

export const CreateLegalDataInboundPortToken = Symbol.for('CreateLegalDataInboundPortToken')

export interface CreateLegalDataInboundPort extends IServiceWithDataInboundPort<LegalDataType.Input, undefined, LegalDataType.Output> {}
