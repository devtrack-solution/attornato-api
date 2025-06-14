import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'

export const CreateLocalProcedureNameInboundPortToken = Symbol.for('CreateLocalProcedureNameInboundPortToken')

export interface CreateLocalProcedureNameInboundPort extends IServiceWithDataInboundPort<LocalProcedureNameType.Input, undefined, LocalProcedureNameType.Output> {}
