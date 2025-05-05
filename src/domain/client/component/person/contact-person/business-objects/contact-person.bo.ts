import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ContactPersonType } from '@/domain/client/component/person/contact-person/types/contact-person.type'

export interface IContactPerson extends IBusinessObject<ContactPersonType.Input, ContactPersonType.Output> {}

export class ContactPerson extends BaseBusinessObject<ContactPersonType.Repository, ContactPersonType.Output> implements IContactPerson, IValidator {
  private _freeFieldOne!: string
  private _note!: string
  private _freeFieldId?: string
  private _mobilePhone?: string
  private _phoneNumber?: string
  private _fatherName?: string
  private _motherName?: string

  private loadData(data: ContactPersonType.Input): ContactPersonType.Output {
    try {
      this._freeFieldOne = data.freeFieldOne
      this._note = data.note
      if (this._freeFieldId)
        this._freeFieldId = data.freeFieldId
      this._mobilePhone = data.mobilePhone
      this._phoneNumber = data.phoneNumber
      this._fatherName = data.fatherName
      this._motherName = data.motherName
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading ContactPerson entity`))
    }
    return this.toJson()
  }

  constructor(props: ContactPersonType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get freeFieldOne(): string {
    return this._freeFieldOne
  }

  get note(): string {
    return this._note
  }

  get mobilePhone(): string | undefined {
    return this._mobilePhone
  }

  get phoneNumber(): string | undefined {
    return this._phoneNumber
  }

  get fatherName(): string | undefined {
    return this._fatherName
  }

  get motherName(): string | undefined {
    return this._motherName
  }

  validate(): void {
    ValidationBuilder.of({ value: this._freeFieldOne, fieldName: 'freeFieldOne' })
      .of({ value: this._note, fieldName: 'note' })
      .of({ value: this._freeFieldId, fieldName: 'freeFieldId' })
      .of({ value: this._mobilePhone, fieldName: 'mobilePhone' })
      .of({ value: this._phoneNumber, fieldName: 'phoneNumber' })
      .of({ value: this._fatherName, fieldName: 'fatherName' })
      .of({ value: this._motherName, fieldName: 'motherName' })

      .build('Failed to validate ContactPerson rules')
  }

  toPersistenceObject(): ContactPersonType.Output {
    return {
      id: this._id.toString(),
      freeFieldOne: this._freeFieldOne,
      note: this._note,
      freeFieldId: this._freeFieldId,
      mobilePhone: this._mobilePhone,
      phoneNumber: this._phoneNumber,
      fatherName: this._fatherName,
      motherName: this._motherName,
    }
  }
}
