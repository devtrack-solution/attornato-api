import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'

export interface IContactType extends IBusinessObject<ContactTypeType.Input, ContactTypeType.Output> {}

export class ContactType extends BaseBusinessObject<ContactTypeType.Repository, ContactTypeType.Output> implements IContactType, IValidator {
  private _name!: string

  private loadData(data: ContactTypeType.Input): ContactTypeType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading ContactType entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: ContactTypeType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate ContactType rules')
  }

  toPersistenceObject(): ContactTypeType.Output {
    return {
      name: this._name,
    }
  }
}
