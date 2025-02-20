import { MachineGroupType } from '@/domain/machine/group/types/machine-group.type';
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port';
import { Criteria } from '@/core/domain/types/criteria.type';

export const MachineGroupRepositoryOutboundPortSymbol = Symbol('MachineGroupRepositoryOutboundPortSymbol');

export interface MachineGroupRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, MachineGroupType.Input, MachineGroupType.Output> {}
