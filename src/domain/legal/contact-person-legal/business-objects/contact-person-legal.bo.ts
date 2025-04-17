import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { FreeField } from '@/domain/free-field/business-objects/free-field.bo'
import { ContactPersonLegalType } from '@/domain/legal/contact-person-legal/types/contact-person-legal.type'

export interface IContactPersonLegal extends IBusinessObject<ContactPersonLegalType.Input, ContactPersonLegalType.Output> {}

export class ContactPersonLegal extends BaseBusinessObject<ContactPersonLegalType.Repository, ContactPersonLegalType.Output> implements IContactPersonLegal, IValidator {
  private _freeFieldOne!: string
  private _note!: string
  private _freeField!: FreeField

  private loadData(data: ContactPersonLegalType.Input): ContactPersonLegalType.Output {
    try {
      this._freeFieldOne = data.freeFieldOne
      this._note = data.note
      this._freeField = new FreeField(data.freeField)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading ContactPersonLegal entity`))
    }
    return this.toJson()
  }

  constructor(props: ContactPersonLegalType.Input) {
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

  get freeField(): FreeField {
    return this._freeField
  }

  validate(): void {
    ValidationBuilder.of({ value: this._freeFieldOne, fieldName: 'freeFieldOne' })
      .required()
      .of({ value: this._note, fieldName: 'note' })
      .required()
      .of({ value: this._freeField, fieldName: 'freeField' })
      .build('Failed to validate ContactPersonLegal rules')
  }

  toPersistenceObject(): ContactPersonLegalType.Output {
    return {
      id: this._id.toString(),
      freeFieldOne: this._freeFieldOne,
      note: this._note,
      freeField: this._freeField.toPersistenceObject(),
    }
  }
}
