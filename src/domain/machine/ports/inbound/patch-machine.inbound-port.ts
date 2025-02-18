import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchMachineInboundPortToken = Symbol.for('PatchMachineInboundPortToken')

export interface PatchMachineInboundPort extends IServiceInboundPort<Partial<MachineType.Input>, Criteria.ById, void> {}
