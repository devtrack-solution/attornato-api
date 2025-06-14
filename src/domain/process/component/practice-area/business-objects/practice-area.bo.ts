import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'

export interface IPracticeArea extends IBusinessObject<PracticeAreaType.Input, PracticeAreaType.Output> {}

export class PracticeArea extends BaseBusinessObject<PracticeAreaType.Repository, PracticeAreaType.Output> implements IPracticeArea, IValidator {
  private _name!: string

  private loadData(data: PracticeAreaType.Input): PracticeAreaType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw e
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: PracticeAreaType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).required().build('Failed to validate PracticeArea rules')
  }

  toPersistenceObject(): PracticeAreaType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
