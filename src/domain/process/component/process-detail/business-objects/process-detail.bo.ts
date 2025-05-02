import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProcessDetailType } from '../types/process-detail.type'
import { Detail } from '@/domain/process/component/detail/business-objects/detail.bo'
import { FreeField1 } from '@/domain/process/component/process-detail/component/free-field-1/business-objects/free-field-1.bo'
import { FreeField2 } from '@/domain/process/component/process-detail/component/free-field-2/business-objects/free-field-2.bo'
import { FreeField6 } from '@/domain/process/component/process-detail/component/free-field-6/business-objects/free-field-6.bo'
import { Origin } from '@/domain/process/component/origin/business-objects/origin.bo'
import { Partner } from '@/domain/process/component/partner/business-objects/partner.bo'
import { Prognosis } from '@/domain/process/component/prognosis/business-objects/prognosis.bo'
import { DetailType } from '@/domain/process/component/detail/types/detail.type'
import { FreeField1Type } from '@/domain/process/component/process-detail/component/free-field-1/types/free-field-1.type'
import { FreeField2Type } from '@/domain/process/component/process-detail/component/free-field-2/types/free-field-2.type'
import { FreeField6Type } from '@/domain/process/component/process-detail/component/free-field-6/types/free-field-6.type'
import { OriginType } from '@/domain/process/component/origin/types/origin.type'
import { PrognosisType } from '@/domain/process/component/prognosis/types/prognosis.type'
import { PartnerType } from '@/domain/process/component/partner/types/partner.type'

export interface IProcessDetail extends IBusinessObject<ProcessDetailType.Input, ProcessDetailType.Output> {}

export class ProcessDetail extends BaseBusinessObject<ProcessDetailType.Repository, ProcessDetailType.Output> implements IProcessDetail, IValidator {
  private _detail!: Detail
  private _freeField1!: FreeField1
  private _freeField2!: FreeField2
  private _freeField3!: string
  private _freeField4!: string
  private _freeField5!: string
  private _freeField6!: FreeField6
  private _origin!: Origin
  private _partner!: Partner
  private _prognosis!: Prognosis

  private loadData(data: ProcessDetailType.Input): ProcessDetailType.Output {
    try {
      this._detail = new Detail(data.detail)
      this._freeField1 = new FreeField1(data.freeField1)
      this._freeField2 = new FreeField2(data.freeField2)
      this._freeField3 = data.freeField3
      this._freeField4 = data.freeField4
      this._freeField5 = data.freeField5
      this._freeField6 = new FreeField6(data.freeField6)
      this._origin = new Origin(data.origin)
      this._partner = new Partner(data.partner)
      this._prognosis = new Prognosis(data.prognosis)
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

  get detail(): DetailType.Input {
    return this._detail
  }

  get freeField1(): FreeField1Type.Input {
    return this._freeField1
  }

  get freeField2(): FreeField2Type.Input {
    return this._freeField2
  }

  get freeField3(): string {
    return this._freeField3
  }

  get freeField4(): string {
    return this._freeField4
  }

  get freeField5(): string {
    return this._freeField5
  }

  get freeField6(): FreeField6Type.Input {
    return this._freeField6
  }

  get origin(): OriginType.Input {
    return this._origin
  }

  get partner(): PartnerType.Input {
    return this._partner
  }

  get prognosis(): PrognosisType.Input {
    return this._prognosis
  }

  validate(): void {
    ValidationBuilder.of({ value: this._detail, fieldName: 'detail' })
      .of({ value: this._freeField1, fieldName: 'freeField1' })
      .of({ value: this._freeField2, fieldName: 'freeField2' })
      .of({ value: this._freeField3, fieldName: 'freeField3' })
      .required()
      .of({ value: this._freeField4, fieldName: 'freeField4' })
      .required()
      .of({ value: this._freeField5, fieldName: 'freeField5' })
      .required()
      .of({ value: this._freeField6, fieldName: 'freeField6' })
      .of({ value: this._origin, fieldName: 'origin' })
      .of({ value: this._partner, fieldName: 'partner' })
      .of({ value: this._prognosis, fieldName: 'prognosis' })
      .build('Failed to validate ProcessDetail rules')
  }

  toPersistenceObject(): ProcessDetailType.Output {
    return {
      id: this._id.toString(),
      detail: { id: this._detail.id.toString() },
      freeField1: { id: this._freeField1.id.toString() },
      freeField2: { id: this._freeField2.id.toString() },
      freeField3: this._freeField3,
      freeField4: this._freeField4,
      freeField5: this._freeField5,
      freeField6: this._freeField6,
      origin: { id: this._origin.id.toString() },
      partner: { id: this._partner.id.toString() },
      prognosis: { id: this._prognosis.id.toString() },
    }
  }
}
