import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ActionObjectType } from '@/domain/process/action-object/types/action-object.type'

export interface IActionObject extends IBusinessObject<ActionObjectType.Input, ActionObjectType.Output> {}

export class ActionObject extends BaseBusinessObject<ActionObjectType.Repository, ActionObjectType.Output> implements IActionObject, IValidator {
  private _name!: string

  private loadData(data: ActionObjectType.Input): ActionObjectType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading ActionObject entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: ActionObjectType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate ActionObject rules')
  }

  toPersistenceObject(): ActionObjectType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
