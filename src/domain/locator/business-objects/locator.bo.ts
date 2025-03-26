import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LocatorType } from '../types/locator.type'

export interface ILocator extends IBusinessObject<LocatorType.Input, LocatorType.Output> {}

export class Locator extends BaseBusinessObject<LocatorType.Repository, LocatorType.Output> implements ILocator, IValidator {
  private _name!: string

  private loadData(data: LocatorType.Input): LocatorType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Locator entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: LocatorType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Locator rules')
  }

  toPersistenceObject(): LocatorType.Output {
    return {
      name: this._name,
    }
  }
}
