import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type'

export const CreateMachineGroupInboundPortToken = Symbol.for('CreateMachineGroupInboundPortToken')

export interface CreateMachineGroupInboundPort extends IServiceWithDataInboundPort<MachineGroupType.Input, undefined, MachineGroupType.Output> {}
