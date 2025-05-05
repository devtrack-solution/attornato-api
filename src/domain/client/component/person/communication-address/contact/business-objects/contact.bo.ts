import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ContactType } from '@/domain/client/component/person/communication-address/contact/types/contact.type'

export interface IContact extends IBusinessObject<ContactType.Input, ContactType.Output> {}

export class Contact extends BaseBusinessObject<ContactType.Repository, ContactType.Output> implements IContact, IValidator {
  private _value!: string
  private _communicationChannelId!: string

  private loadData(data: ContactType.Input): ContactType.Output {
    try {
      this._value = data.value || ''
      this._communicationChannelId = data.communicationChannelId
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse('Error loading Contact entity'))
    }
    return this.toJson()
  }

  get value(): string {
    return this._value
  }

  get communicationChannelId(): string {
    return this._communicationChannelId
  }

  constructor(props: ContactType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._value, fieldName: 'value' })
      .required()
      .of({
        value: this._communicationChannelId,
        fieldName: 'communicationChannelId',
      })
      .build('Failed to validate Contact rules')
  }

  toPersistenceObject(): ContactType.Output {
    return {
      id: this._id.toString(),
      value: this._value,
      communicationChannelId: this._communicationChannelId,
    }
  }
}
