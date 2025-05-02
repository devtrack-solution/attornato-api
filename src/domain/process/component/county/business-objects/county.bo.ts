import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { CountyType } from '../types/county.type'

export interface ICounty extends IBusinessObject<CountyType.Input, CountyType.Output> {}

export class County extends BaseBusinessObject<CountyType.Repository, CountyType.Output> implements ICounty, IValidator {
  private _name!: string

  private loadData(data: CountyType.Input): CountyType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading County entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: CountyType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate County rules')
  }

  toPersistenceObject(): CountyType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
