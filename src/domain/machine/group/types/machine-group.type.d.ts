import { BaseType } from '@/core/domain/types/base.type'
import { MachineType } from '@/domain/machine/types/machine.type'

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

export type WorkScheduleType = {
  daysOfWeek: string[]
  workIntervals: string[]
  monthsOfYear: string[]
  sector: string
}