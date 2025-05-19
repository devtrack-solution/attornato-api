import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'

export const CreateJudicialInboundPortToken = Symbol.for('CreateJudicialInboundPortToken')

export interface CreateJudicialInboundPort extends IServiceWithDataInboundPort<JudicialType.Input, undefined, JudicialType.Output> {}
