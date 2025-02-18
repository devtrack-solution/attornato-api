import { BaseType } from '@/core/domain/types/base.type'

export enum MachineStatus {
  MAINTENANCE = 'Em manutenção',
  STOPPED = 'Parada',
  ADJUSTMENTS = 'Ajustes',
  TESTING = 'Em testes',
  AWAITING_MAINTENANCE = 'Aguardando manutenção',
  AVAILABLE = 'Disponível',
  PREPARING = 'Em preparação',
  INACTIVE = 'Inativa',
}

export namespace MachineType {
  export type Input = {
    name: string
    description: string
    machineCode: string
    // machineGroupId: string
    status: string
    // technicalSpecification: TechnicalSpecificationType.Input
    // location: LocationType.Input
    // productionCapacity: ProductionCapacityType.Input
    // operators: OperatorType.Input[]
    // maintenances: MaintenanceType.Input[]
  } & BaseType.Input

  export type Output = Input

  export type OutputPaginated = {
    count: number
    limit: number
    offset: number
    data: Partial<Output[]>
  }

  export type Repository = Output

  export type RepositoryPaginated = OutputPaginated
}
