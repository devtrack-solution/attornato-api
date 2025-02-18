import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineType } from '@/domain/machine/types/machine.type'

export const CreateMachineInboundPortToken = Symbol.for('CreateMachineInboundPortToken')

export interface CreateMachineInboundPort extends IServiceWithDataInboundPort<MachineType.Input, undefined, MachineType.Output> {}
