import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ContactType } from '@/domain/todo/types/contact.type'
import { IdentityVo } from '@/core/domain/value-objects/identity.vo'

export interface IContact extends IBusinessObject<ContactType.Input, ContactType.Output> {}

export class Contact extends BaseBusinessObject<ContactType.Repository, ContactType.Output> implements IContact, IValidator {
  private _contactType!: string
  private _name!: string
  private _value!: string

  private loadData(data: ContactType.Input): ContactType.Output {
    try {
      this._contactType = data.contactType
      this._name = data.name
      this._value = data.value
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading contact entity`))
    }
    return this
  }

  constructor(props: ContactType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get contactType(): string {
    return this._contactType
  }

  get name(): string {
    return this._name
  }

  get value(): string {
    return this._value
  }

  toPersistence(): ContactType.Output {
    return { contactType: this.contactType, name: this.name, value: this.value }
  }

  toJson(): ContactType.Output {
    return this.toPersistence()
  }

  /**
   * Checks if another Identity is equal to the current one.
   * @param other - Another Identity instance.
   * @returns True if both identities are equal, false otherwise.
   */
  equals(other: ContactType.Input): boolean {
    if (!other) {
      return false
    } else if (other.id === undefined) {
      return false
    } else {
      return this._id.equals(IdentityVo.create(other.id))
    }
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).required().of({ value: this._value, fieldName: 'value' }).required().build('Failed to validate contact rules')
  }
}
