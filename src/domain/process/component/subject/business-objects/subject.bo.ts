import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'

export interface ISubject extends IBusinessObject<SubjectType.Input, SubjectType.Output> {}

export class Subject extends BaseBusinessObject<SubjectType.Repository, SubjectType.Output> implements ISubject, IValidator {
  private _name!: string

  private loadData(data: SubjectType.Input): SubjectType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Subject entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: SubjectType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Subject rules')
  }

  toPersistenceObject(): SubjectType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
