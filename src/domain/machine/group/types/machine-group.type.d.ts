import { BaseType } from '@/core/domain/types/base.type'

export namespace MachineGroupType {
  export type Input = {
    groupName: string
    slug: string
    groupCode: string
    machines?: MachineType.Input[]
    averageHourlyRate?: number
    maxDailyProductivity?: number
    workSchedules?: WorkScheduleType | null
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

export namespace MachineType {
  export type Input = {
    id: number
    name: string
    hourlyRate: number
    maxDailyProductivity: number
  }

  export type Output = Input
}

export type WorkScheduleType = {
  daysOfWeek: string[]
  workIntervals: string[]
  monthsOfYear: string[]
  sector: string
}
