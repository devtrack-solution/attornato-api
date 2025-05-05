import { IValidator, ValidationBuilder } from '@/core/domain/validators'
import { IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { IndividualType } from '@/domain/client/component/individual/types/individual.type'
import { Client } from '@/domain/client/business-objects/client.bo'
import { Person } from '@/domain/client/component/person/business-objects/person.bo'

export interface IIndividual extends IBusinessObject<IndividualType.Input, IndividualType.Output> {}

export class Individual extends Client <IndividualType.Repository, IndividualType.Output> implements IIndividual, IValidator  {
  private _name!: string
  private _nationality!: string
  private _occupation!: string
  private _educationLevel!: string
  private _maritalStatus!: string
  private _birthDate!: Date
  private _cpf!: string
  private _rg!: string
  private _pis!: string

  protected override loadData(data: IndividualType.Input): IndividualType.Output {
    try {
      this._name = data.name
      this._nationality = data.nationality
      this._occupation = data.occupation
      this._educationLevel = data.educationLevel
      this._maritalStatus = data.maritalStatus
      this._birthDate = data.birthDate
      this._cpf = data.cpf
      this._rg = data.rg
      this._pis = data.pis
      this._groupCustomerId = data.groupCustomerId
      this._profileId = data.profileId
      this._person = new Person(data.person)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Individual entity`))
    }
    return this.toJson()
  }

  constructor(props: IndividualType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
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

  override validate(): void {
    ValidationBuilder
      .of({ value: this._name, fieldName: 'name' })
      .required()
      .of({ value: this._nationality, fieldName: 'nationality' })
      .required()
      .of({ value: this._occupation, fieldName: 'occupation' })
      .required()
      .of({ value: this._educationLevel, fieldName: 'educationLevel' })
      .required()
      .of({ value: this._maritalStatus, fieldName: 'maritalStatus' })
      .required()
      .of({ value: this._birthDate, fieldName: 'birthDate' })
      .required()
      .of({ value: this._cpf, fieldName: 'cpf' })
      .required()
      .of({ value: this._rg, fieldName: 'rg' })
      .required()
      .of({ value: this._pis, fieldName: 'pis' })
      .required()
      .build('Failed to validate Individual rules')
  }

  override toPersistenceObject(): IndividualType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
      nationality: this._nationality,
      occupation: this._occupation,
      educationLevel: this._educationLevel,
      maritalStatus: this._maritalStatus,
      birthDate: this._birthDate,
      cpf: this._cpf,
      rg: this._rg,
      pis: this._pis,
      personId: this._person.id,
      person: this._person.toPersistenceObject(),
      groupCustomerId: this._groupCustomerId,
      profileId: this._profileId,
    }
  }
}
