import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { DetailsType } from '@/domain/details/types/details.type'

export interface IDetails extends IBusinessObject<DetailsType.Input, DetailsType.Output> {}

export class Details extends BaseBusinessObject<DetailsType.Repository, DetailsType.Output> implements IDetails, IValidator {
  private _name!: string

  private loadData(data: DetailsType.Input): DetailsType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Details entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: DetailsType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Details rules')
  }

  toPersistenceObject(): DetailsType.Output {
    return {
      name: this._name,
    }
  }
}
