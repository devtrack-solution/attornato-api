import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LegalType } from '@/domain/legal/types/legal.type'
import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'
import { LegalData } from '@/domain/legal/legal-data/business-objects/legal-data.bo'
import { CommunicationAddress } from '@/domain/communication-address/business-objects/communication-address.bo'
import { ContactPerson } from '@/domain/legal/contact-person/business-objects/contact-person.bo'

export interface ILegal extends IBusinessObject<LegalType.Input, LegalType.Output> {}

export class Legal extends BaseBusinessObject<LegalType.Repository, LegalType.Output> implements ILegal, IValidator {
  private _legalData!: LegalData
  private _communicationAddress!: CommunicationAddress
  private _contactPerson!: ContactPerson

  private loadData(data: LegalType.Input): LegalType.Output {
    try {
      this._legalData = data.legalData
      this._communicationAddress = data.communicationAddress
      this._contactPerson = data.contactPerson
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Legal entity`))
    }
    return this.toJson()
  }

  get legalData(): LegalDataType.Input {
    return this._legalData
  }

  get communicationAddress(): CommunicationAddress {
    return this._communicationAddress
  }

  get contactPerson(): ContactPerson {
    return this._contactPerson
  }

  constructor(props: LegalType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({
      value: this._legalData,
      fieldName: 'legalData',
    })
        .required()
        .of({
          value: this._communicationAddress,
          fieldName: 'communicationAddress',
        })
        .required()
        .of({
          value: this._contactPerson,
          fieldName: 'contactPerson',
        })
        .required()
        .build('Failed to validate Legal rules')
  }

  toPersistenceObject(): LegalType.Output {
    return {
      legalData: this._legalData.toPersistenceObject(),
      communicationAddress: this._communicationAddress.toPersistenceObject(),
      contactPerson: this._contactPerson.toPersistenceObject(),
    }
  }
}
