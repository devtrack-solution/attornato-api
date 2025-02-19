import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { MachineType } from '@/domain/machine/types/machine.type'
import { TechnicalSpecification } from '@/domain/machine/business-objects/technical-specification.bo'

export interface IMachine extends IBusinessObject<MachineType.Input, MachineType.Output> {}

export class Machine extends BaseBusinessObject<MachineType.Repository, MachineType.Output> implements IMachine, IValidator {
  private _name!: string
  private _description!: string
  private _machineCode!: string
  // private _machineGroupId!: string
  private _status!: string
  private _technicalSpecification?: TechnicalSpecification
  // private _location!: Location
  // private _productionCapacity!: ProductionCapacity
  // private _operators!: Operator[]
  // private _maintenances!: Maintenance[]

  private loadData(data: MachineType.Input): MachineType.Output {
    try {
      this._name = data.name
      this._description = data.description
      this._machineCode = data.machineCode
      // this._machineGroupId = data.machineGroupId
      this._status = data.status
      this._technicalSpecification = data.technicalSpecification ? new TechnicalSpecification(data.technicalSpecification) : undefined
      // this._location = new Location(data.location)
      // this._productionCapacity = new ProductionCapacity(data.productionCapacity)
      // this._operators = data.operators.map((op) => new Operator(op))
      // this._maintenances = data.maintenances.map((mt) => new Maintenance(mt))
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Machine entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get machineCode(): string {
    return this._machineCode
  }

  get status(): string {
    return this._status
  }

  constructor(props: MachineType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      //.of({ value: this._machineGroupId, fieldName: 'machineGroupId' }).required()
      .of({ value: this._status, fieldName: 'status' })
      .required()
      .build('Failed to validate Machine rules')
  }

  toPersistenceObject(): MachineType.Output {
    return {
      name: this._name,
      description: this._description,
      machineCode: this._machineCode,
      // machineGroupId: this._machineGroupId,
      status: this._status,
      technicalSpecification: this._technicalSpecification?.toPersistence(),
      /*location: this._location.toPersistenceObject(),
      productionCapacity: this._productionCapacity.toPersistenceObject(),
      operators: this._operators.map((op) => op.toPersistenceObject()),
      maintenances: this._maintenances.map((mt) => mt.toPersistenceObject()),*/
    }
  }
}
