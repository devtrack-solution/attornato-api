import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LegalType } from '@/domain/client/component/legal/types/legal.type'
import { Client } from '@/domain/client/business-objects/client.bo'
import { Person } from '@/domain/client/component/person/business-objects/person.bo'

export interface ILegal extends IBusinessObject<LegalType.Input, LegalType.Output> {}

export class Legal extends Client<LegalType.Repository, LegalType.Output> implements ILegal, IValidator {
  protected _responsible!: string
  protected _companyName!: string
  protected _tradeName!: string
  protected _businessArea!: string
  protected _cnpj!: string
  protected _stateRegistration!: string
  protected _municipalRegistration!: string

  protected override loadData(data: LegalType.Input): LegalType.Output {
    try {
      this._responsible = data.responsible
      this._companyName = data.companyName
      this._tradeName = data.tradeName
      this._businessArea = data.businessArea
      this._cnpj = data.cnpj
      this._stateRegistration = data.stateRegistration
      this._municipalRegistration = data.municipalRegistration
      this._groupCustomerId = data.groupCustomerId
      this._profileId = data.profileId
      this._person = new Person(data.person)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Legal entity`))
    }
    return this.toJson()
  }

  constructor(props: LegalType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get responsible(): string {
    return this._responsible
  }

  get companyName(): string {
    return this._companyName
  }

  get tradeName(): string {
    return this._tradeName
  }

  get businessArea(): string {
    return this._businessArea
  }

  get cnpj(): string {
    return this._cnpj
  }

  get stateRegistration(): string {
    return this._stateRegistration
  }

  get municipalRegistration(): string {
    return this._municipalRegistration
  }

  override validate(): void {
    ValidationBuilder
      .of({
        value: this._responsible,
        fieldName: 'responsible',
      })
      .required()
      .of({
        value: this._companyName,
        fieldName: 'companyName',
      })
      .required()
      .of({
        value: this._tradeName,
        fieldName: 'tradeName',
      })
      .required()
      .of({
        value: this._businessArea,
        fieldName: 'businessArea',
      })
      .required()
      .of({
        value: this._cnpj,
        fieldName: 'cnpj',
      })
      .required()
      .of({
        value: this._stateRegistration,
        fieldName: 'stateRegistration',
      })
      .required()
      .of({
        value: this._municipalRegistration,
        fieldName: 'municipalRegistration',
      })
      .required()
      .of({
        value: this._person,
        fieldName: 'person',
      })
      .required()
      .build('Failed to validate Legal rules')
  }

  override toPersistenceObject(): LegalType.Output {
    return {
      id: this._id.toString(),
      responsible: this._responsible,
      companyName: this._companyName,
      tradeName: this._tradeName,
      businessArea: this._businessArea,
      cnpj: this._cnpj,
      stateRegistration: this._stateRegistration,
      municipalRegistration: this._municipalRegistration,
      personId: this._person.id,
      person: this._person.toPersistenceObject(),
      groupCustomerId: this._groupCustomerId,
      profileId: this._profileId,
    }
  }
}
