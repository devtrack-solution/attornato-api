import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LegalDataType } from '@/domain/legal/legal-data/types/legal-data.type'
import { GroupCustomer } from '@/domain/group-customer/business-objects/group-customer.bo'
import { Profile } from '@/domain/profile/business-objects/profile.bo'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { ProfileType } from '@/domain/profile/types/profile.type'

export interface ILegalData extends IBusinessObject<LegalDataType.Input, LegalDataType.Output> {}

export class LegalData extends BaseBusinessObject<LegalDataType.Repository, LegalDataType.Output> implements ILegalData, IValidator {
  _clientId!: string
  _groupCustomer!: GroupCustomer
  _profile!: Profile
  _responsable!: string
  _companyName!: string
  _tradeName!: string
  _businessArea!: string
  _cnpj!: string
  _stateRegistration!: string
  _municipalRegistration!: string

  private loadData(data: LegalDataType.Input): LegalDataType.Output {
    try {
      this._clientId = data.clientId
      this._groupCustomer = data.groupCustomer
      this._profile = data.profile
      this._responsable = data.responsable
      this._companyName = data.companyName
      this._tradeName = data.tradeName
      this._businessArea = data.businessArea
      this._cnpj = data.cnpj
      this._stateRegistration = data.stateRegistration
      this._municipalRegistration = data.municipalRegistration
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading LegalData entity`))
    }
    return this.toJson()
  }

  get clientId(): string {
    return this._clientId
  }

  get groupCustomer(): GroupCustomerType.Input {
    return this._groupCustomer
  }

  get profile(): ProfileType.Input {
    return this._profile
  }

  get responsable(): string {
    return this._responsable
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

  constructor(props: LegalDataType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({
      value: this._clientId,
      fieldName: 'clientId',
    })
      .required()
      .of({
        value: this.groupCustomer,
        fieldName: 'groupCustomer',
      })
      .required()
      .of({
        value: this.profile,
        fieldName: 'profile',
      })
      .required()
      .of({
        value: this.responsable,
        fieldName: 'responsable',
      })
      .required()
      .of({
        value: this.companyName,
        fieldName: 'companyName',
      })
      .required()
      .of({
        value: this.tradeName,
        fieldName: 'tradeName',
      })
      .required()
      .of({
        value: this.businessArea,
        fieldName: 'businessArea',
      })
      .required()
      .of({
        value: this.cnpj,
        fieldName: 'cnpj',
      })
      .required()
      .of({
        value: this.stateRegistration,
        fieldName: 'stateRegistration',
      })
      .required()
      .of({
        value: this.municipalRegistration,
        fieldName: 'municipalRegistration',
      })
      .required()
      .build('Failed to validate LegalData rules')
  }

  toPersistenceObject(): LegalDataType.Output {
    return {
      clientId: this._clientId,
      groupCustomer: this._groupCustomer,
      profile: this._profile,
      responsable: this._responsable,
      companyName: this._companyName,
      tradeName: this._tradeName,
      businessArea: this._businessArea,
      cnpj: this._cnpj,
      stateRegistration: this._stateRegistration,
      municipalRegistration: this._municipalRegistration,
    }
  }
}
