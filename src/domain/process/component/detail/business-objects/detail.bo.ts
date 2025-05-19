import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export interface IDetail extends IBusinessObject<DetailType.Input, DetailType.Output> {}

export class Detail extends BaseBusinessObject<DetailType.Repository, DetailType.Output> implements IDetail, IValidator {
  private _name!: string

  private loadData(data: DetailType.Input): DetailType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Detail entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: DetailType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).required().build('Failed to validate Detail rules')
  }

  toPersistenceObject(): DetailType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
