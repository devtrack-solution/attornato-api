import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type'
import { Contact } from '@/domain/communication-address/contact/business-objects/contact.bo'
import { ContactType } from '@/domain/communication-address/contact/types/contact.type'

export interface ICommunicationAddress extends IBusinessObject<CommunicationAddressType.Input, CommunicationAddressType.Output> {}

export class CommunicationAddress extends BaseBusinessObject<CommunicationAddressType.Repository, CommunicationAddressType.Output> implements ICommunicationAddress, IValidator {
  private _zipCode!: string
  private _street!: string
  private _neighborhood!: string
  private _city!: string
  private _state!: string
  private _contacts: Contact[] = []

  private loadData(data: CommunicationAddressType.Input): CommunicationAddressType.Output {
    try {
      this._zipCode = data.zipCode
      this._street = data.street
      this._neighborhood = data.neighborhood
      this._city = data.city
      this._state = data.state
      this._contacts = data.contacts ? data.contacts.map((contact) => new Contact(contact)) : []
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading CommunicationAddress entity`))
    }
    return this.toJson()
  }

  get zipCode(): string {
    return this._zipCode
  }

  get street(): string {
    return this._street
  }

  get neighborhood(): string {
    return this._neighborhood
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get contacts(): ContactType.Output[] {
    return this._contacts
  }

  constructor(props: CommunicationAddressType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({
      value: this._zipCode,
      fieldName: 'zipCode',
    })
      .required()
      .of({
        value: this._street,
        fieldName: 'street',
      })
      .required()
      .of({
        value: this._street,
        fieldName: 'street',
      })
      .required()
      .of({
        value: this._neighborhood,
        fieldName: 'neighborhood',
      })
      .required()
      .of({
        value: this._city,
        fieldName: 'city',
      })
      .required()
      .of({
        value: this._state,
        fieldName: 'state',
      })
      .required().of({
        value: this._contacts,
        fieldName: 'contacts',
      })
      .build('Failed to validate CommunicationAddress rules')
  }

  toPersistenceObject(): CommunicationAddressType.Output {
    return {
      id: this._id.toString(),
      zipCode: this._zipCode,
      street: this._street,
      neighborhood: this._neighborhood,
      city: this._city,
      state: this._state,
      contacts: this._contacts.map((contact) => contact.toPersistenceObject()),
    }
  }
}
