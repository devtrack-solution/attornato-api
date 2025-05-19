import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'

export interface IFreeField extends IBusinessObject<FreeFieldType.Input, FreeFieldType.Output> {}

export class FreeField extends BaseBusinessObject<FreeFieldType.Repository, FreeFieldType.Output> implements IFreeField, IValidator {
  private _name!: string

  private loadData(data: FreeFieldType.Input): FreeFieldType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading FreeField entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: FreeFieldType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).build('Failed to validate FreeField rules')
  }
  toPersistenceObject(): FreeFieldType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
