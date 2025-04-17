import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { CommunicationAddress } from '@/domain/communication-address/business-objects/communication-address.bo'
import { ContactPersonLegal } from '@/domain/legal/contact-person-legal/business-objects/contact-person-legal.bo'
import { PersonType } from '@/domain/legal/types/person.type'

export interface ILegal extends IBusinessObject<PersonType.Input, PersonType.Output> {}

export class Person extends BaseBusinessObject<PersonType.Repository, PersonType.Output> implements ILegal, IValidator {
  private _clientId!: string
  private _communicationAddress!: CommunicationAddress
  private _contactPersonLegal!: ContactPersonLegal

  private loadData(data: PersonType.Input): PersonType.Output {
    try {
      this._clientId = data.clientId
      this._communicationAddress = new CommunicationAddress(data.communicationAddress)
      this._contactPersonLegal = new ContactPersonLegal(data.contactPersonLegal)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Legal entity`))
    }
    return this.toJson()
  }

  get clientId(): string {
    return this._clientId
  }

  get communicationAddress(): CommunicationAddress {
    return this._communicationAddress
  }

  get contactPersonLegal(): ContactPersonLegal {
    return this._contactPersonLegal
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
        value: this._contactPersonLegal,
        fieldName: 'contactPersonLegal',
      })
      .build('Failed to validate Legal rules')
  }

  toPersistenceObject(): PersonType.Output {
    return {
      id: this._id.toString(),
      clientId: this._clientId,
      communicationAddress: this._communicationAddress.toPersistenceObject(),
      contactPersonLegal: this._contactPersonLegal.toPersistenceObject(),
    }
  }
}
