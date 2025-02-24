import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectMachineGroupInboundPortToken = Symbol.for('ListToSelectMachineGroupInboundPortToken')

export interface ListToSelectMachineGroupInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<MachineGroupType.Output[]>> {}
