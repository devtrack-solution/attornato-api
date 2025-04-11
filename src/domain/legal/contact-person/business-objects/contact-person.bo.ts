import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import {FreeField} from "@/domain/free-field/business-objects/free-field.bo";
import {ContactPersonType} from "@/domain/legal/contact-person/types/contact-person.type";

export interface IContactPerson extends IBusinessObject<ContactPersonType.Input, ContactPersonType.Output> {}

export class ContactPerson extends BaseBusinessObject<ContactPersonType.Repository, ContactPersonType.Output> implements IContactPerson, IValidator {
  private _freeFieldOne!: string
  private _note!: string
  private _freeField!: FreeField

  private loadData(data: ContactPersonType.Input): ContactPersonType.Output {
    try {
      this._freeFieldOne = data.freeFieldOne
      this._note = data.note
      this._freeField = data.freeField
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

  get freeField(): FreeField {
    return this._freeField
  }

  validate(): void {
    ValidationBuilder
        .of({ value: this._freeFieldOne, fieldName: 'freeFieldOne' })
        .required()
        .of({ value: this._note, fieldName: 'note' })
        .required()
        .of({ value: this._freeField, fieldName: 'freeField' })
        .required()
        .build('Failed to validate ContactPerson rules')
  }

  toPersistenceObject(): ContactPersonType.Output {
    return {
      freeFieldOne: this._freeFieldOne,
      note: this._note,
      freeField: this._freeField.toPersistenceObject(),
    }
  }
}
