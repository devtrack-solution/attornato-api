import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'
import { Process } from '@/domain/process/business-objects/process.bo'

export interface IAdministrative extends IBusinessObject<AdministrativeType.Input, AdministrativeType.Output> {}

export class Administrative extends Process<AdministrativeType.Repository, AdministrativeType.Output> implements IAdministrative, IValidator {
  private _cnjNumber!: string

  protected override loadData(data: AdministrativeType.Input): AdministrativeType.Output {
    try {
      super.loadData(data)
      this._cnjNumber = data.cnjNumber
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Administrative entity`))
    }
    return this.toJson()
  }

  get cnjNumber(): string {
    return this._cnjNumber
  }

  constructor(props: AdministrativeType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  override validate(): void {
    ValidationBuilder.of({ value: this._cnjNumber, fieldName: 'cnjNumber' }).required().build('Failed to validate Administrative rules')
  }

  override toPersistenceObject(): AdministrativeType.Output {
    return {
      id: this._id.toString(),
      cnjNumber: this._cnjNumber,
      ...super.toPersistenceObject(),
    }
  }
}
