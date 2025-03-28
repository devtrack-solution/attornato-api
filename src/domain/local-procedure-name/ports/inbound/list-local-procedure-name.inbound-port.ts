import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureNameType } from '@/domain/local-procedure-name/types/local-procedure-name.type'

export const ListLocalProcedureNameInboundPortToken = Symbol.for('ListLocalProcedureNameInboundPortToken')

export interface ListLocalProcedureNameInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, LocalProcedureNameType.OutputPaginated> {}
