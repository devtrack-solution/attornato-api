import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { AccountType } from '@/domain/account/types/account.type'
import { AccountPerson } from '@/domain/account/component/account-person/business-objects/account-person.bo'
import { Credential } from '@/domain/securities/business-objects/credential.bo'
import { Logger } from '@nestjs/common'

export interface IAccount extends IBusinessObject<AccountType.Input, AccountType.Output> {}

export class Account extends BaseBusinessObject<AccountType.Repository, AccountType.Output> implements IAccount, IValidator {
  private readonly logger = new Logger(Account.name)
  private _accountPerson!: AccountPerson
  private _credential!: Credential

  private loadData(data: AccountType.Input): AccountType.Output {
    try {
      this._accountPerson = new AccountPerson(data.accountPerson)
      this._credential = new Credential(data.credential)
    } catch (e) {
      throw e
    }
    return this.toJson()
  }

  get accountPerson(): AccountPerson {
    return this._accountPerson
  }

  get credential(): Credential {
    return this._credential
  }

  constructor(props: AccountType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder
      .of({ value: this._accountPerson, fieldName: 'accountPerson' })
      .of({ value: this._credential, fieldName: 'credential' })
      .build('Failed to validate Account rules')
  }

  toPersistenceObject(): AccountType.Output {
    return {
      id: this._id.toString(),
      accountPersonId: this._accountPerson.id.toString(),
      accountPerson: this._accountPerson.toPersistenceObject(),
      credentialId: this._credential.id.toString(),
      credential: this._credential.toPersistenceObject(),
    }
  }
}
