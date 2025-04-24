import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { CommunicationAddress } from '@/domain/communication-address/business-objects/communication-address.bo'
import { PersonType } from '@/domain/client/individual/person/types/person.type'
import { ContactPerson } from '@/domain/client/individual/contact-person/business-objects/contact-person.bo'
import { ContactPersonType } from '@/domain/client/individual/contact-person/types/contact-person.type'
import { CommunicationAddressType } from '@/domain/communication-address/types/communication-address.type'

export interface IIndividual extends IBusinessObject<PersonType.Input, PersonType.Output> {}

export class Person extends BaseBusinessObject<PersonType.Repository, PersonType.Output> implements IIndividual, IValidator {
  private _clientId!: string
  private _communicationAddress!: CommunicationAddress
  private _contactPerson!: ContactPerson

  private loadData(data: PersonType.Input): PersonType.Output {
    try {
      this._clientId = data.clientId
      this._communicationAddress = new CommunicationAddress(data.communicationAddress)
      this._contactPerson = new ContactPerson(data.contactPerson)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Individual entity`))
    }
    return this.toJson()
  }

  get clientId(): string {
    return this._clientId
  }

  get communicationAddress(): CommunicationAddressType.Input {
    return this._communicationAddress
  }

  get contactPerson(): ContactPersonType.Input {
    return this._contactPerson
  }

  constructor(props: PersonType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({
      value: this._clientId,
      fieldName: 'clientId',
    })
      .required()
      .of({
        value: this._communicationAddress,
        fieldName: 'communicationAddress',
      })
      .of({
        value: this._contactPerson,
        fieldName: 'contactPerson',
      })
      .build('Failed to validate Individual rules')
  }

  toPersistenceObject(): PersonType.Output {
    return {
      id: this._id.toString(),
      clientId: this._clientId,
      communicationAddress: this._communicationAddress.toPersistenceObject(),
      contactPerson: this._contactPerson.toPersistenceObject(),
    }
  }
}
