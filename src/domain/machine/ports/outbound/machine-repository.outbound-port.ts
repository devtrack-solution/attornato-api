import { MachineType } from '@/domain/machine/types/machine.type'
import { IRelationalDatabaseOutboundPort } from '@/core/domain/ports/outbound/relational-database.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

export const MachineRepositoryOutboundPortSymbol = Symbol('MachineRepositoryOutboundPortSymbol')

export interface MachineRepositoryOutboundPort extends IRelationalDatabaseOutboundPort<Criteria.ById, MachineType.Input, MachineType.Output> {}
