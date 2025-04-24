import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { IdentifierType } from '@/domain/client/identifier/types/identifier.type'
import { ClientCategoryEnum } from '@/presentation/controllers/http/client/identifier/dtos/identifier.dto'

export interface IIdentifier extends IBusinessObject<IdentifierType.Input, IdentifierType.Output> {}

export class Identifier extends BaseBusinessObject<IdentifierType.Repository, IdentifierType.Output> implements IIdentifier, IValidator {
  private _value!: number
  private _clientCategory!: string

  private loadData(data: IdentifierType.Input): IdentifierType.Output {
    try {
      this._value = data.value
      this._clientCategory = data.clientCategory
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Identifier entity`))
    }
    return this.toJson()
  }

  get value(): number {
    return this._value
  }
  get clientCategory(): string {
    return this._clientCategory
  }

  constructor(props: IdentifierType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._value, fieldName: 'value' })
      .required()
      .of({ value: this._clientCategory, fieldName: 'clientCategory' })
      .required()
      .build('Failed to validate Identifier rules')
  }

  toPersistenceObject(): IdentifierType.Output {
    return {
      id: this._id.toString(),
      value: this._value,
      clientCategory: this._clientCategory,
    }
  }
}
