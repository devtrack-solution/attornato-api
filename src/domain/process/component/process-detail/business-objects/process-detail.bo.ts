import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProcessDetailType } from '../types/process-detail.type'

export interface IProcessDetail extends IBusinessObject<ProcessDetailType.Input, ProcessDetailType.Output> {}

export class ProcessDetail extends BaseBusinessObject<ProcessDetailType.Repository, ProcessDetailType.Output> implements IProcessDetail, IValidator {
  private _detailId?: string
  private _freeField1Id?: string
  private _freeField2Id?: string
  private _freeField3!: string
  private _freeField4!: string
  private _freeField5!: string
  private _freeField6Id?: string
  private _originId?: string
  private _partnerId?: string
  private _prognosisId?: string

  private loadData(data: ProcessDetailType.Input): ProcessDetailType.Output {
    try {
      this._detailId = data.detailId
      this._freeField1Id = data.freeField1Id
      this._freeField2Id = data.freeField2Id
      this._freeField3 = data.freeField3
      this._freeField4 = data.freeField4
      this._freeField5 = data.freeField5
      this._freeField6Id = data.freeField6Id
      this._originId = data.originId
      this._partnerId = data.partnerId
      this._prognosisId = data.prognosisId
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse('Error loading ProcessDetail entity'))
    }

    return this.toJson()
  }

  constructor(props: ProcessDetailType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  // get detailId(): string {
  //   return this._detailId
  // }
  //
  // get freeField1Id(): string {
  //   return this._freeField1Id
  // }
  //
  // get freeField2Id(): string {
  //   return this._freeField2Id
  // }

  get freeField3(): string {
    return this._freeField3
  }

  get freeField4(): string {
    return this._freeField4
  }

  get freeField5(): string {
    return this._freeField5
  }

  // get freeField6Id(): string {
  //   return this._freeField6Id
  // }
  //
  // get originId(): string  {
  //   return this._originId
  // }
  //
  // get partnerId(): string {
  //   return this._partnerId
  // }
  //
  // get prognosisId(): string {
  //   return this._prognosisId
  // }

  validate(): void {
    ValidationBuilder.of({ value: this._detailId, fieldName: 'detailId' })
      .of({ value: this._freeField1Id, fieldName: 'freeField1Id' })
      .of({ value: this._freeField2Id, fieldName: 'freeField2Id' })
      .of({ value: this._freeField3, fieldName: 'freeField3' })
      .required()
      .of({ value: this._freeField4, fieldName: 'freeField4' })
      .required()
      .of({ value: this._freeField5, fieldName: 'freeField5' })
      .required()
      .of({ value: this._freeField6Id, fieldName: 'freeField6Id' })
      .of({ value: this._originId, fieldName: 'originId' })
      .of({ value: this._partnerId, fieldName: 'partnerId' })
      .of({ value: this._prognosisId, fieldName: 'prognosisId' })
      .build('Failed to validate ProcessDetail rules')
  }

  toPersistenceObject(): ProcessDetailType.Output {
    return {
      id: this._id.toString(),
      detailId: this._detailId,
      freeField1Id: this._freeField1Id,
      freeField2Id: this._freeField2Id,
      freeField3: this._freeField3,
      freeField4: this._freeField4,
      freeField5: this._freeField5,
      freeField6Id: this._freeField6Id,
      originId: this._originId,
      partnerId: this._partnerId,
      prognosisId: this._prognosisId,
    }
  }
}
