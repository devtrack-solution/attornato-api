import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'

export const ListToSelectProceduralStatusInboundPortToken = Symbol.for('ListToSelectProceduralStatusInboundPortToken')

export interface ListToSelectProceduralStatusInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ProceduralStatusType.Output[]>> {}
