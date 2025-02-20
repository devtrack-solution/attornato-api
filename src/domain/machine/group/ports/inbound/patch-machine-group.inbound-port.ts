import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type';
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchMachineGroupInboundPortToken = Symbol.for('PatchMachineGroupInboundPortToken');

export interface PatchMachineGroupInboundPort extends IServiceInboundPort<Partial<MachineGroupType.Input>, Criteria.ById, void> {}
