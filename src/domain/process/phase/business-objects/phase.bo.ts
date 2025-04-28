import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { PhaseType } from '../types/phase.type'

export interface IPhase extends IBusinessObject<PhaseType.Input, PhaseType.Output> {}

export class Phase extends BaseBusinessObject<PhaseType.Repository, PhaseType.Output> implements IPhase, IValidator {
  private _name!: string

  private loadData(data: PhaseType.Input): PhaseType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Phase entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: PhaseType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Phase rules')
  }

  toPersistenceObject(): PhaseType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
