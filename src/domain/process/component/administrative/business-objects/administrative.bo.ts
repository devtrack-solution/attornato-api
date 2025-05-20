import { IValidator } from '@/core/domain/validators'
import { IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { AdministrativeType } from '@/domain/process/component/administrative/types/administrative.type'
import { Process } from '@/domain/process/business-objects/process.bo'
import { ProcessFinancial } from '@/domain/process/component/process-financial/business-objects/process-financial.bo'
import { ProcessDetail } from '@/domain/process/component/process-detail/business-objects/process-detail.bo'

export interface IAdministrative extends IBusinessObject<AdministrativeType.Input, AdministrativeType.Output> {}

export class Administrative extends Process<AdministrativeType.Repository, AdministrativeType.Output> implements IAdministrative, IValidator {

  protected override loadData(data: AdministrativeType.Input): AdministrativeType.Output {
    try {
      this._clientId = data.clientId
      this._processId = data.processId
      this._groupProcessId = data.groupProcessId
      this._folder = data.folder
      this._label = data.label
      this._favorite = data.favorite
      this._processNumber = data.processNumber
      this._localProcedureNumber = data.localProcedureNumber
      this._localProcedureNameId = data.localProcedureNameId
      this._proceduralStatusId = data.proceduralStatusId
      this._countyId = data.countyId
      this._countyUf = data.countyUf
      this._request = data.request
      this._note = data.note
      this._justiceSecret = data.justiceSecret
      this._captureProcedures = data.captureProcedures
      this._phaseId = data.phaseId
      this._practiceAreaId = data.practiceAreaId
      this._responsibleId = data.responsibleId
      this._actionObjectId = data.actionObjectId
      this._locatorId = data.locatorId
      this._subjectId = data.subjectId
      this._processFinancial = new ProcessFinancial(data.processFinancial)
      this._processDetail = new ProcessDetail(data.processDetail)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Administrative entity`))
    }
    return this.toJson()
  }

  constructor(props: AdministrativeType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  override validate(): void {
  }

  override toPersistenceObject(): AdministrativeType.Output {
    return {
      id: this._id.toString(),
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
      processFinancialId: this._processFinancial.id,
      processFinancial: this._processFinancial.toPersistenceObject(),
      processDetailId: this._processDetail.id,
      processDetail: this._processDetail.toPersistenceObject(),
    }
  }
}
