import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ContactType } from '@/domain/contact/types/contact.type'
import { CommunicationChannel } from '@/domain/communication-channel/business-objects/communication-channel.bo'
import { CommunicationChannelType } from "@/domain/communication-channel/types/communication-channel.type";

export interface IContact extends IBusinessObject<ContactType.Input, ContactType.Output> {}

export class Contact extends BaseBusinessObject<ContactType.Repository, ContactType.Output> implements IContact, IValidator {
  private _value!: string
  private _communicationChannel!: CommunicationChannel

  private loadData(data: ContactType.Input): ContactType.Output {
    try {
      this._value = data.value
      this._communicationChannel = data.communicationChannel
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Contact entity`))
    }
    return this.toJson()
  }

  get value(): string {
    return this._value
  }

  get communicationChannel(): CommunicationChannelType.Input {
    return this._communicationChannel
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
        value: this._communicationChannel,
        fieldName: 'communicationChannel',
      })
      .required()
      .build('Failed to validate Contact rules')
  }

  toPersistenceObject(): ContactType.Output {
    return {
      value: this._value,
      communicationChannel: this._communicationChannel,
    }
  }
}
