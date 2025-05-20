import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'

export interface IFreeField1 extends IBusinessObject<FreeField1Type.Input, FreeField1Type.Output> {}

export class FreeField1 extends BaseBusinessObject<FreeField1Type.Repository, FreeField1Type.Output> implements IFreeField1, IValidator {
  private _name!: string

  private loadData(data: FreeField1Type.Input): FreeField1Type.Output {
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

  constructor(props: FreeField1Type.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).build('Failed to validate FreeField1 rules')
  }

  toPersistenceObject(): FreeField1Type.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
