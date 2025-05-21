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
      super.loadData(data)
      this._cnjNumber = data.cnjNumber
    } catch (e) {
      throw e
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
      clientId: this._clientId,
      processId: this._processId,
      groupProcessId: this._groupProcessId,
      folder: this._folder,
      label: this._label,
      favorite: this._favorite,
      processNumber: this._processNumber,
      localProcedureNumber: this._localProcedureNumber,
      localProcedureNameId: this._localProcedureNameId,
      proceduralStatusId: this._proceduralStatusId,
      countyId: this._countyId,
      countyUf: this._countyUf,
      request: this._request,
      note: this._note,
      justiceSecret: this._justiceSecret,
      captureProcedures: this._captureProcedures,
      phaseId: this._phaseId,
      practiceAreaId: this._practiceAreaId,
      responsibleId: this._responsibleId,
      actionObjectId: this._actionObjectId,
      locatorId: this._locatorId,
      subjectId: this._subjectId,
      processFinancialId: this._processFinancial?.id,
      processFinancial: this._processFinancial?.toPersistenceObject(),
      processDetailId: this._processDetail?.id,
      processDetail: this._processDetail?.toPersistenceObject(),
    }
  }
}
