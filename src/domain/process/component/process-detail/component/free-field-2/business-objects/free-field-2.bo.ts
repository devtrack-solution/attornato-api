import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'

export interface IFreeField2 extends IBusinessObject<FreeField2Type.Input, FreeField2Type.Output> {}

export class FreeField2 extends BaseBusinessObject<FreeField2Type.Repository, FreeField2Type.Output> implements IFreeField2, IValidator {
  private _name!: string

  private loadData(data: FreeField2Type.Input): FreeField2Type.Output {
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

  constructor(props: FreeField2Type.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).build('Failed to validate FreeField2 rules')
  }

  toPersistenceObject(): FreeField2Type.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
