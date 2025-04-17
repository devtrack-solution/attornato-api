import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ResponsibleType } from '../types/responsible.type'

export interface IResponsible extends IBusinessObject<ResponsibleType.Input, ResponsibleType.Output> {}

export class Responsible extends BaseBusinessObject<ResponsibleType.Repository, ResponsibleType.Output> implements IResponsible, IValidator {
  private _name!: string

  private loadData(data: ResponsibleType.Input): ResponsibleType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Responsible entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: ResponsibleType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Responsible rules')
  }

  toPersistenceObject(): ResponsibleType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
