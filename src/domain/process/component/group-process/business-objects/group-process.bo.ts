import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'

export interface IGroupProcess extends IBusinessObject<GroupProcessType.Input, GroupProcessType.Output> {}

export class GroupProcess extends BaseBusinessObject<GroupProcessType.Repository, GroupProcessType.Output> implements IGroupProcess, IValidator {
  private _name!: string

  private loadData(data: GroupProcessType.Input): GroupProcessType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading GroupProcess entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: GroupProcessType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate GroupProcess rules')
  }

  toPersistenceObject(): GroupProcessType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
