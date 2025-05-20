import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { AccountPersonType } from '@/domain/account/component/account-person/types/account-person.type'

export interface IAccountPerson extends IBusinessObject<AccountPersonType.Input, AccountPersonType.Output> {}

export class AccountPerson extends BaseBusinessObject<AccountPersonType.Repository, AccountPersonType.Output> implements IAccountPerson, IValidator {
  private _name!: string
  private _birthday!: Date
  private _nickName?: string
  private _gender?: string
  private _avatar?: string
  private _governanceSocialIdentity?: string

  private loadData(data: AccountPersonType.Input): AccountPersonType.Output {
    try {
      this._name = data.name
      this._birthday = data.birthday
      this._nickName = data.nickName
      this._gender = data.gender
      this._avatar = data.avatar
      this._governanceSocialIdentity = data.governanceSocialIdentity
    } catch (e) {
      throw e
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  get birthday(): Date {
    return this._birthday
  }

  get nickName(): string | undefined {
    return this._nickName
  }

  get gender(): string | undefined {
    return this._gender
  }

  get avatar(): string | undefined {
    return this._avatar
  }

  get governanceSocialIdentity(): string | undefined {
    return this._governanceSocialIdentity
  }

  constructor(props: AccountPersonType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .of({ value: this._birthday, fieldName: 'birthday' })
      .required()
      .of({ value: this._nickName, fieldName: 'nickName' })
      .of({ value: this._gender, fieldName: 'gender' })
      .of({ value: this._avatar, fieldName: 'avatar' })
      .of({ value: this._governanceSocialIdentity, fieldName: 'governanceSocialIdentity' })
      .build('Failed to validate AccountPerson rules')
  }

  toPersistenceObject(): AccountPersonType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
      birthday: this._birthday,
      nickName: this._nickName,
      gender: this._gender,
      avatar: this._avatar,
      governanceSocialIdentity: this._governanceSocialIdentity,
    }
  }
}
