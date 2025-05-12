import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export interface IPreference extends IBusinessObject<PreferenceType.Input, PreferenceType.Output> {}

export class Preference extends BaseBusinessObject<PreferenceType.Repository, PreferenceType.Output> implements IPreference, IValidator {
  private _accountId!: string
  private _key!: string
  private _value!: string

  private loadData(data: PreferenceType.Input): PreferenceType.Output {
    try {
      this._accountId = data.accountId
      this._key = data.key
      this._value = data.value
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Preference entity`))
    }
    return this.toJson()
  }

  get accountId(): string {
    return this._accountId
  }

  get key(): string {
    return this._key
  }

  get value(): string {
    return this._value
  }

  constructor(props: PreferenceType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder
      .of({ value: this._accountId, fieldName: 'accountId' })
      .required()
      .of({ value: this._key, fieldName: 'key' })
      .required()
      .of({ value: this._value, fieldName: 'value' })
      .required()
      .build('Failed to validate Preference rules')
  }

  toPersistenceObject(): PreferenceType.Output {
    return {
      id: this._id.toString(),
      accountId: this._accountId,
      key: this._key,
      value: this._value,
    }
  }
}
