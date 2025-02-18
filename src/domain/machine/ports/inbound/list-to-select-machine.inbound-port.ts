import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectMachineInboundPortToken = Symbol.for('ListToSelectMachineInboundPortToken')

export interface ListToSelectMachineInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<MachineType.Output[]>> {}
