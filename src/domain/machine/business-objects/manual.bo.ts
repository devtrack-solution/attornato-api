import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { ManualType } from '@/domain/machine/types/manual.type'
import { TechnicalSpecification } from '@/domain/machine/business-objects/technical-specification.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'


export interface IManual extends IBusinessObject<ManualType.Input, ManualType.Output> {}

export class Manual extends BaseBusinessObject<ManualType.Repository, ManualType.Output> implements IManual, IValidator {
  private _link!: string
  private _description!: string

  private loadData(data: ManualType.Input): ManualType.Output {
    try {
      this._link = data.link
      this._description = data.description
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Machine entity`))
    }
    return this.toJson()
  }

  constructor(props: ManualType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._link, fieldName: 'link' }).required()
      .of({ value: this._description, fieldName: 'description' }).required()
      .build('Failed to validate Manual rules')
  }

  toPersistenceObject(): ManualType.Output {
    return {
      link: this._link,
      description: this._description,
    }
  }
}
