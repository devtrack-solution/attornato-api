import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LocalProcedureNameType } from '@/domain/local-procedure-name/types/local-procedure-name.type'

export interface ILocalProcedureName extends IBusinessObject<LocalProcedureNameType.Input, LocalProcedureNameType.Output> {}

export class LocalProcedureName extends BaseBusinessObject<LocalProcedureNameType.Repository, LocalProcedureNameType.Output> implements ILocalProcedureName, IValidator {
  private _name!: string

  private loadData(data: LocalProcedureNameType.Input): LocalProcedureNameType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading LocalProcedureName entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: LocalProcedureNameType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate LocalProcedureName rules')
  }

  toPersistenceObject(): LocalProcedureNameType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
