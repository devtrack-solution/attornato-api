import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'

export interface IFreeField6 extends IBusinessObject<FreeField6Type.Input, FreeField6Type.Output> {}

export class FreeField6 extends BaseBusinessObject<FreeField6Type.Repository, FreeField6Type.Output> implements IFreeField6, IValidator {
  private _name!: string

  private loadData(data: FreeField6Type.Input): FreeField6Type.Output {
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

  constructor(props: FreeField6Type.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).build('Failed to validate FreeField6 rules')
  }
  toPersistenceObject(): FreeField6Type.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
