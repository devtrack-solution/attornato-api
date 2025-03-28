import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { OriginType } from '@/domain/origin/types/origin.type'

export interface IOrigin extends IBusinessObject<OriginType.Input, OriginType.Output> {}

export class Origin extends BaseBusinessObject<OriginType.Repository, OriginType.Output> implements IOrigin, IValidator {
  private _name!: string

  private loadData(data: OriginType.Input): OriginType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Origin entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: OriginType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Origin rules')
  }

  toPersistenceObject(): OriginType.Output {
    return {
      name: this._name,
    }
  }
}
