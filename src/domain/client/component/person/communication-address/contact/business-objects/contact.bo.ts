import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { CommunicationChannel } from '@/domain/client/component/person/communication-address/contact/communication-channel/business-objects/communication-channel.bo'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'
import { ContactType } from '@/domain/client/component/person/communication-address/contact/types/contact.type'

export interface IContact extends IBusinessObject<ContactType.Input, ContactType.Output> {}

export class Contact extends BaseBusinessObject<ContactType.Repository, ContactType.Output> implements IContact, IValidator {
  private _value!: string
  private _communicationChannel!: CommunicationChannel

  private loadData(data: ContactType.Input): ContactType.Output {
    try {
      this._value = data.value || ''
      this._communicationChannel = CommunicationChannel.fromReference(data.communicationChannel)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse('Error loading Contact entity'))
    }
    return this.toJson()
  }

  get value(): string {
    return this._value
  }

  get communicationChannel(): CommunicationChannelType.Output {
    return this._communicationChannel.toJson()
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
        value: this._communicationChannel?.id,
        fieldName: 'communicationChannel.id',
      })
      .build('Failed to validate Contact rules')
  }

  toPersistenceObject(): ContactType.Output {
    return {
      id: this._id.toString(),
      value: this._value,
      communicationChannel: { id: this._communicationChannel.id },
    }
  }
}
