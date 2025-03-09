import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { MachineGroupType, WorkScheduleType } from '@/domain/machine/group/types/machine-group.type'
import { Machine } from '@/domain/machine/business-objects/machine.bo'

export interface IMachineGroup extends IBusinessObject<MachineGroupType.Input, MachineGroupType.Output> {}

export class MachineGroup extends BaseBusinessObject<MachineGroupType.Repository, MachineGroupType.Output> implements IMachineGroup, IValidator {
  private _groupName!: string
  private _slug!: string
  private _groupCode!: string
  private _machines: Machine[] = []
  private _averageHourlyRate!: number
  private _maxDailyProductivity!: number
  private _workSchedules?: null

  private loadData(data: MachineGroupType.Input): MachineGroupType.Output {
    try {
      this._groupName = data.groupName
      this._slug = data.slug
      this._groupCode = data.groupCode
      this._machines = data.machines ? data.machines.map(machine => new Machine(machine)) : []
      this._averageHourlyRate = data.averageHourlyRate ? data.averageHourlyRate : 0
      this._maxDailyProductivity = data.maxDailyProductivity ? data.maxDailyProductivity : 0
      this._workSchedules = null
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading MachineGroup entity`))
    }
    return this.toJson()
  }

  get groupName(): string {
    return this._groupName
  }

  get slug(): string {
    return this._slug
  }

  get groupCode(): string {
    return this._groupCode
  }

  get machines(): Machine[] {
    return this._machines
  }

  get averageHourlyRate(): number {
    return this._averageHourlyRate
  }

  get maxDailyProductivity(): number {
    return this._maxDailyProductivity
  }

  get workSchedules(): WorkScheduleType | undefined | null {
    return this._workSchedules
  }

  constructor(props: MachineGroupType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._groupName, fieldName: 'name' })
      .required()
      .of({ value: this._slug, fieldName: 'slug' })
      .required()
      .of({ value: this._groupCode, fieldName: 'code' })
      .required()
      .of({ value: this._averageHourlyRate, fieldName: 'averageHourlyRate' })
      .required()
      .of({ value: this._maxDailyProductivity, fieldName: 'maxDailyProductivity' })
      .required()
      .build('Failed to validate MachineGroup rules')
  }

  toPersistenceObject(): MachineGroupType.Output {
    return {
      groupName: this._groupName,
      slug: this._slug,
      groupCode: this._groupCode,
      machines: [], //this._machines.map(machine => machine.toPersistenceObject()),
      averageHourlyRate: this._averageHourlyRate,
      maxDailyProductivity: this._maxDailyProductivity,
      workSchedules: this._workSchedules,
    }
  }
}
