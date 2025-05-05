import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProcessType } from '@/domain/process/types/process.type'
import { ProcessFinancial } from '@/domain/process/component/process-financial/business-objects/process-financial.bo'
import { ProcessDetail } from '@/domain/process/component/process-detail/business-objects/process-detail.bo'
import { ProcessDetailType } from '@/domain/process/component/process-detail/types/process-detail.type'
import { ProcessFinancialType } from '@/domain/process/component/process-financial/types/process-financial.type'

export interface IProcess extends IBusinessObject<ProcessType.Input, ProcessType.Output> {}

export class Process<TRepository extends ProcessType.Input = ProcessType.Repository, TOutput extends ProcessType.Output = ProcessType.Output> extends BaseBusinessObject<TRepository, TOutput> implements IProcess {
  protected _clientId!: string
  protected _processId!: string
  protected _groupProcessId!: string
  protected _folder!: number
  protected _label!: string
  protected _favorite!: boolean
  protected _processNumber!: string
  protected _localProcedureNumber!: number
  protected _localProcedureNameId!: string
  protected _proceduralStatusId!: string
  protected _countyId!: string
  protected _countyUf!: string
  protected _request!: string
  protected _note!: string
  protected _justiceSecret!: boolean
  protected _captureProcedures!: boolean
  protected _phaseId!: string
  protected _practiceAreaId!: string
  protected _responsibleId!: string
  protected _actionObjectId!: string
  protected _locatorId!: string
  protected _subjectId!: string
  protected _processFinancial!: ProcessFinancial
  protected _processDetail!: ProcessDetail

  protected loadData(data: ProcessType.Input): ProcessType.Output {
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
      throw new EntityBadDataLoadException(new ValidationErrorResponse('Error loading Process entity'))
    }

    return this.toJson()
  }

  constructor(props: ProcessType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get processId(): string {
    return this._processId
  }

  get folder(): number {
    return this._folder
  }

  get label(): string {
    return this._label
  }

  get favorite(): boolean {
    return this._favorite
  }

  get processNumber(): string {
    return this._processNumber
  }

  get localProcedureNumber(): number {
    return this._localProcedureNumber
  }

  get countyUf(): string {
    return this._countyUf
  }

  get request(): string {
    return this._request
  }

  get note(): string {
    return this._note
  }

  get justiceSecret(): boolean {
    return this._justiceSecret
  }

  get captureProcedures(): boolean {
    return this._captureProcedures
  }

  get processFinancial(): ProcessFinancialType.Input {
    return this._processFinancial
  }

  get processDetail(): ProcessDetailType.Input {
    return this._processDetail
  }

  validate(): void {
    ValidationBuilder.of({ value: this._clientId, fieldName: 'clientId' })
      .required()
      .of({ value: this._processId, fieldName: 'processId' })
      .required()
      .of({ value: this._label, fieldName: 'label' })
      .required()
      .of({ value: this._folder, fieldName: 'folder' })
      .required()
      .of({ value: this._processNumber, fieldName: 'processNumber' })
      .required()
      .of({ value: this._localProcedureNumber, fieldName: 'localProcedureNumber' })
      .required()
      .of({ value: this._countyUf, fieldName: 'countyUf' })
      .required()
      .build('Failed to validate Process rules')
  }

  toPersistenceObject(): ProcessType.Output {
    return {
      id: this._id.toString(),
      clientId: this._clientId,
      processId: this._processId,
      groupProcessId:this._groupProcessId,
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
      processFinancial: this._processFinancial.toPersistenceObject(),
      processDetail: this._processDetail.toPersistenceObject(),
    }
  }
}
