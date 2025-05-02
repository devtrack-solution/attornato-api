import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProcessType } from '@/domain/process/types/process.type'
import { GroupProcess } from '@/domain/process/component/group-process/business-objects/group-process.bo'
import { LocalProcedureName } from '@/domain/process/component/local-procedure-name/business-objects/local-procedure-name.bo'
import { ProceduralStatus } from '@/domain/process/component/procedural-status/business-objects/procedural-status.bo'
import { County } from '@/domain/process/component/county/business-objects/county.bo'
import { Phase } from '@/domain/process/component/phase/business-objects/phase.bo'
import { PracticeArea } from '@/domain/process/component/practice-area/business-objects/practice-area.bo'
import { Responsible } from '@/domain/process/component/responsible/business-objects/responsible.bo'
import { ActionObject } from '@/domain/process/component/action-object/business-objects/action-object.bo'
import { Locator } from '@/domain/process/component/locator/business-objects/locator.bo'
import { Subject } from '@/domain/process/component/subject/business-objects/subject.bo'
import { ProcessFinancial } from '@/domain/process/component/process-financial/business-objects/process-financial.bo'
import { ProcessDetail } from '@/domain/process/component/process-detail/business-objects/process-detail.bo'
import { ProcessDetailType } from '@/domain/process/component/process-detail/types/process-detail.type'
import { ProcessFinancialType } from '@/domain/process/component/process-financial/types/process-financial.type'
import { SubjectType } from '@/domain/process/component/subject/types/subject.type'
import { LocatorType } from '@/domain/process/component/locator/types/locator.type'
import { ActionObjectType } from '@/domain/process/component/action-object/types/action-object.type'
import { ResponsibleType } from '@/domain/process/component/responsible/types/responsible.type'
import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'
import { CountyType } from '@/domain/process/component/county/types/county.type'
import { ProceduralStatusType } from '@/domain/process/component/procedural-status/types/procedural-status.type'
import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'
import { GroupProcessType } from '@/domain/process/component/group-process/types/group-process.type'
import { PhaseType } from '@/domain/process/component/phase/types/phase.type'
import { Client } from '@/domain/client/business-objects/client.bo'

export interface IProcess extends IBusinessObject<ProcessType.Input, ProcessType.Output> {}

export class Process<TRepository extends ProcessType.Input = ProcessType.Repository, TOutput extends ProcessType.Output = ProcessType.Output> extends BaseBusinessObject<TRepository, TOutput> implements IProcess {
  protected _client!: Client
  protected _processId!: string
  protected _groupProcess!: GroupProcess
  protected _folder!: number
  protected _label!: string
  protected _favorite!: boolean
  protected _processNumber!: string
  protected _localProcedureNumber!: number
  protected _localProcedureName!: LocalProcedureName
  protected _proceduralStatus!: ProceduralStatus
  protected _county!: County
  protected _countyUf!: string
  protected _request!: string
  protected _note!: string
  protected _justiceSecret!: boolean
  protected _captureProcedures!: boolean
  protected _phase!: Phase
  protected _practiceArea!: PracticeArea
  protected _responsible!: Responsible
  protected _actionObject!: ActionObject
  protected _locator!: Locator
  protected _subject!: Subject
  protected _processFinancial!: ProcessFinancial
  protected _processDetail!: ProcessDetail

  protected loadData(data: ProcessType.Input): ProcessType.Output {
    try {
      this._client = new Client(data.client)
      this._processId = data.processId
      this._groupProcess = new GroupProcess(data.groupProcess)
      this._folder = data.folder
      this._label = data.label
      this._favorite = data.favorite
      this._processNumber = data.processNumber
      this._localProcedureNumber = data.localProcedureNumber
      this._localProcedureName = new LocalProcedureName(data.localProcedureName)
      this._proceduralStatus = new ProceduralStatus(data.proceduralStatus)
      this._county = new County(data.county)
      this._countyUf = data.countyUf
      this._request = data.request
      this._note = data.note
      this._justiceSecret = data.justiceSecret
      this._captureProcedures = data.captureProcedures
      this._phase = new Phase(data.phase)
      this._practiceArea = new PracticeArea(data.practiceArea)
      this._responsible = new Responsible(data.responsible)
      this._actionObject = new ActionObject(data.actionObject)
      this._locator = new Locator(data.locator)
      this._subject = new Subject(data.subject)
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

  get client() {
    return this._client
  }

  get processId(): string {
    return this._processId
  }

  get groupProcess(): GroupProcessType.Input {
    return this._groupProcess
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

  get localProcedureName(): LocalProcedureNameType.Input {
    return this._localProcedureName
  }

  get proceduralStatus(): ProceduralStatusType.Input {
    return this._proceduralStatus
  }

  get county(): CountyType.Input {
    return this._county
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

  get phase(): PhaseType.Input {
    return this._phase
  }

  get practiceArea(): PracticeAreaType.Input {
    return this._practiceArea
  }

  get responsible(): ResponsibleType.Input {
    return this._responsible
  }

  get actionObject(): ActionObjectType.Input {
    return this._actionObject
  }

  get locator(): LocatorType.Input {
    return this._locator
  }

  get subject(): SubjectType.Input {
    return this._subject
  }

  get processFinancial(): ProcessFinancialType.Input {
    return this._processFinancial
  }

  get processDetail(): ProcessDetailType.Input {
    return this._processDetail
  }

  validate(): void {
    ValidationBuilder.of({ value: this._client, fieldName: 'client' })
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
      client: this._client,
      processId: this._processId,
      groupProcess: { id: this._groupProcess.id.toString() },
      folder: this._folder,
      label: this._label,
      favorite: this._favorite,
      processNumber: this._processNumber,
      localProcedureNumber: this._localProcedureNumber,
      localProcedureName: { id: this._localProcedureName.id.toString() },
      proceduralStatus: { id: this._proceduralStatus.id.toString() },
      county: { id: this._county.id.toString() },
      countyUf: this._countyUf,
      request: this._request,
      note: this._note,
      justiceSecret: this._justiceSecret,
      captureProcedures: this._captureProcedures,
      phase: { id: this._phase.id.toString() },
      practiceArea: { id: this._practiceArea.id.toString() },
      responsible: { id: this._responsible.id.toString() },
      actionObject: { id: this._actionObject.id.toString() },
      locator: { id: this._locator.id.toString() },
      subject: { id: this._subject.id.toString() },
      processFinancial: this._processFinancial.toPersistenceObject(),
      processDetail: this._processDetail.toPersistenceObject(),
    }
  }
}
