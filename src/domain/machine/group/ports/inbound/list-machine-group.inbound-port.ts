import {
  IServiceWithCriteriaInboundPort
} from '@/core/domain/ports/inbound/service.inbound-port'
import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type';
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListMachineGroupInboundPortToken = Symbol.for('ListMachineGroupInboundPortToken');

export interface ListMachineGroupInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, MachineGroupType.OutputPaginated> {}
