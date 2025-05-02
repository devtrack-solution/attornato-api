import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { IndividualType } from '@/domain/client/component/individual/types/individual.type'
import { GroupCustomer } from '@/domain/client/component/group-customer/business-objects/group-customer.bo'
import { Profile } from '@/domain/client/component/profile/business-objects/profile.bo'
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { Person } from '@/domain/client/component/person/business-objects/person.bo'
import { PersonType } from '@/domain/client/component/person/types/person.type'

export interface IIndividual extends IBusinessObject<IndividualType.Input, IndividualType.Output> {}

export class Individual extends BaseBusinessObject<IndividualType.Repository, IndividualType.Output> implements IIndividual, IValidator {
  private _groupCustomer!: GroupCustomer
  private _profile!: Profile
  private _person!: Person
  private _name!: string
  private _nationality!: string
  private _occupation!: string
  private _educationLevel!: string
  private _maritalStatus!: string
  private _birthDate!: Date
  private _cpf!: string
  private _rg!: string
  private _pis!: string

  private loadData(data: IndividualType.Input): IndividualType.Output {
    try {
      this._groupCustomer = GroupCustomer.fromReference(data.groupCustomer)
      this._profile = Profile.fromReference(data.profile)
      this._person = new Person(data.person)
      this._name = data.name ?? ''
      this._nationality = data.nationality
      this._occupation = data.occupation
      this._educationLevel = data.educationLevel
      this._maritalStatus = data.maritalStatus
      this._birthDate = data.birthDate
      this._cpf = data.cpf
      this._rg = data.rg
      this._pis = data.pis
    } catch (e) {
      console.error('Erro no loadData Individual:', e)
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Individual entity`))
    }
    return this.toJson()
  }

  constructor(props: IndividualType.Input) {
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

  get name(): string {
    return this._name
  }

  get nationality(): string {
    return this._nationality
  }

  get occupation(): string {
    return this._occupation
  }

  get educationLevel(): string {
    return this._educationLevel
  }

  get maritalStatus(): string {
    return this._maritalStatus
  }

  get birthDate(): Date {
    return this._birthDate
  }

  get cpf(): string {
    return this._cpf
  }

  get rg(): string {
    return this._rg
  }

  get pis(): string {
    return this._pis
  }

  validate(): void {
    ValidationBuilder.of({ value: this._groupCustomer, fieldName: 'groupCustomer' })
      .of({ value: this._profile, fieldName: 'profile' })
      .of({ value: this._person, fieldName: 'person' })
      .of({ value: this._name, fieldName: 'name' }).required()
      .of({ value: this._nationality, fieldName: 'nationality' }).required()
      .of({ value: this._occupation, fieldName: 'occupation' }).required()
      .of({ value: this._educationLevel, fieldName: 'educationLevel' }).required()
      .of({ value: this._maritalStatus, fieldName: 'maritalStatus' }).required()
      .of({ value: this._birthDate, fieldName: 'birthDate' }).required()
      .of({ value: this._cpf, fieldName: 'cpf' }).required()
      .of({ value: this._rg, fieldName: 'rg' }).required()
      .of({ value: this._pis, fieldName: 'pis' }).required()
      .build('Failed to validate Individual rules')
  }

  toPersistenceObject(): IndividualType.Output {
    return {
      id: this._id.toString(),
      groupCustomer: { id: this._groupCustomer.id },
      profile: { id: this._profile.id },
      person: this._person.toPersistenceObject(),
      name: this._name,
      nationality: this._nationality,
      occupation: this._occupation,
      educationLevel: this._educationLevel,
      maritalStatus: this._maritalStatus,
      birthDate: this._birthDate,
      cpf: this._cpf,
      rg: this._rg,
      pis: this._pis,
    }
  }
}
