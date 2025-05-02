import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'

export interface IPrognosis extends IBusinessObject<PrognosisType.Input, PrognosisType.Output> {}

export class Prognosis extends BaseBusinessObject<PrognosisType.Repository, PrognosisType.Output> implements IPrognosis, IValidator {
  private _name!: string

  private loadData(data: PrognosisType.Input): PrognosisType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Prognosis entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: PrognosisType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Prognosis rules')
  }

  toPersistenceObject(): PrognosisType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
