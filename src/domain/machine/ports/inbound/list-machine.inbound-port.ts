import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListMachineInboundPortToken = Symbol.for('ListMachineInboundPortToken')

export interface ListMachineInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, MachineType.OutputPaginated> {}
