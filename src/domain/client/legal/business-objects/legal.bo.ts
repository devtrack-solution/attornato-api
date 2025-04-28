import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LegalType } from '@/domain/client/legal/types/legal.type'
import { GroupCustomer } from '@/domain/client/group-customer/business-objects/group-customer.bo'
import { Profile } from '@/domain/client/profile/business-objects/profile.bo'
import { GroupCustomerType } from '@/domain/client/group-customer/types/group-customer.type'
import { ProfileType } from '@/domain/client/profile/types/profile.type'
import { Person } from '@/domain/client/person/business-objects/person.bo'
import { PersonType } from '@/domain/client/person/types/person.type'

export interface ILegal extends IBusinessObject<LegalType.Input, LegalType.Output> {}

export class Legal extends BaseBusinessObject<LegalType.Repository, LegalType.Output> implements ILegal, IValidator {
  private _groupCustomer!: GroupCustomer
  private _profile!: Profile
  private _person!: Person
  private _responsible!: string
  private _companyName!: string
  private _tradeName!: string
  private _businessArea!: string
  private _cnpj!: string
  private _stateRegistration!: string
  private _municipalRegistration!: string

  private loadData(data: LegalType.Input): LegalType.Output {
    try {
      console.error(JSON.stringify(data, null, 2))
      this._groupCustomer = GroupCustomer.fromReference(data.groupCustomer)
      this._profile = Profile.fromReference(data.profile)
      this._person = new Person(data.person)
      this._responsible = data.responsible
      this._companyName = data.companyName
      this._tradeName = data.tradeName
      this._businessArea = data.businessArea
      this._cnpj = data.cnpj
      this._stateRegistration = data.stateRegistration
      this._municipalRegistration = data.municipalRegistration

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

  get person(): PersonType.Input {
    return this._person
  }

  get groupCustomer(): GroupCustomerType.Input {
    return this._groupCustomer
  }

  get profile(): ProfileType.Input {
    return this._profile
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

  validate(): void {
    ValidationBuilder.of({
      value: this._groupCustomer,
      fieldName: 'groupCustomer',
    })
      .of({
        value: this._profile,
        fieldName: 'profile',
      })
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
      .build('Failed to validate Legal rules')
  }

  toPersistenceObject(): LegalType.Output {
    return {
      id: this._id.toString(),
      groupCustomer: { id: this._groupCustomer.id },
      profile: { id: this._profile.id },
      person: this._person.toPersistenceObject(),
      responsible: this._responsible,
      companyName: this._companyName,
      tradeName: this._tradeName,
      businessArea: this._businessArea,
      cnpj: this._cnpj,
      stateRegistration: this._stateRegistration,
      municipalRegistration: this._municipalRegistration,
    }
  }
}
