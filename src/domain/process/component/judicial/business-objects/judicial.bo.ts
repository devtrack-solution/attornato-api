import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { JudicialType } from '@/domain/process/component/judicial/types/judicial.type'
import { Process } from '@/domain/process/business-objects/process.bo'

export interface IJudicial extends IBusinessObject<JudicialType.Input, JudicialType.Output> {}

export class Judicial extends Process<JudicialType.Repository, JudicialType.Output> implements IJudicial, IValidator {
  private _cnjNumber!: string

  protected override loadData(data: JudicialType.Input): JudicialType.Output {
    try {
      this._cnjNumber = data.cnjNumber
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Judicial entity`))
    }
    return this.toJson()
  }

  get cnjNumber(): string {
    return this._cnjNumber
  }

  constructor(props: JudicialType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  override validate(): void {
    ValidationBuilder.of({ value: this._cnjNumber, fieldName: 'cnjNumber' }).required().build('Failed to validate Judicial rules')
  }

  override toPersistenceObject(): JudicialType.Output {
    return {
      id: this._id.toString(),
      cnjNumber: this._cnjNumber,
      ...super.toPersistenceObject()
    }
  }
}
