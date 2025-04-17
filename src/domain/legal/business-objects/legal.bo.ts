import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { LegalType } from '@/domain/legal/types/legal.type'
import { Person } from '@/domain/legal/business-objects/person.bo'
import { GroupCustomer } from '@/domain/group-customer/business-objects/group-customer.bo'
import { Profile } from '@/domain/profile/business-objects/profile.bo'
import { PersonType } from '@/domain/legal/types/person.type'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { ProfileType } from '@/domain/profile/types/profile.type'
import {undefined} from "zod";

export interface ILegal extends IBusinessObject<LegalType.Input, LegalType.Output> {}

export class Legal extends BaseBusinessObject<LegalType.Repository, LegalType.Output> implements ILegal, IValidator {
  private _groupCustomer!: GroupCustomer
  private _profile!: Profile
  private _responsible!: string
  private _companyName!: string
  private _tradeName!: string
  private _businessArea!: string
  private _cnpj!: string
  private _stateRegistration!: string
  private _municipalRegistration!: string
  private _person!: Person

  private loadData(data: LegalType.Input): LegalType.Output {
    try {
      this._groupCustomer = new GroupCustomer(data.groupCustomer)
      this._profile = new Profile(data.profile)
      this._responsible = data.responsible
      this._companyName = data.companyName
      this._tradeName = data.tradeName
      this._businessArea = data.businessArea
      this._cnpj = data.cnpj
      this._stateRegistration = data.stateRegistration
      this._municipalRegistration = data.municipalRegistration
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
      groupCustomer: this._groupCustomer.toPersistenceObject(),
      profile: this._profile.toPersistenceObject(),
      person: this._person.toPersistenceObject(),
      responsible: this._responsible,
      companyName: this._companyName,
      tradeName: this._tradeName,
      businessArea: this._businessArea,
      cnpj: this._cnpj,
      stateRegistration: this._stateRegistration,
      municipalRegistration: this._municipalRegistration
    }
  }
}
