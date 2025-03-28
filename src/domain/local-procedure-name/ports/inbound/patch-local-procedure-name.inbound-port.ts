import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureNameType } from '@/domain/local-procedure-name/types/local-procedure-name.type'

export const PatchLocalProcedureNameInboundPortToken = Symbol.for('PatchLocalProcedureNameInboundPortToken')

export interface PatchLocalProcedureNameInboundPort extends IServiceInboundPort<Partial<LocalProcedureNameType.Input>, Criteria.ById, void> {}
