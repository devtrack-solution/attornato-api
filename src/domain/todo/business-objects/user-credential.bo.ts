import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { UserCredentialType } from '@/domain/todo/types/user-credential.type'

export interface IUserCredential extends IBusinessObject<UserCredentialType.Input, UserCredentialType.Output> {}

export class UserCredential extends BaseBusinessObject<UserCredentialType.Repository, UserCredentialType.Output> implements IUserCredential {
  private _passwordHash?: string
  private _lastLogin?: Date
  private _expiredAt?: Date
  private _resetPasswordToken?: string
  private _resetPasswordCode?: string

  private loadData(data: UserCredentialType.Input): UserCredentialType.Output {
    try {
      this._passwordHash = data.passwordHash
      this._lastLogin = data.lastLogin
      this._expiredAt = data.expiredAt
      this._resetPasswordToken = data.resetPasswordToken
      this._resetPasswordCode = data.resetPasswordCode
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading credential entity`))
    }
    return this
  }

  constructor(props: UserCredentialType.Input) {
    super(props)
    this.loadData(props)
  }

  get passwordHash(): string | undefined {
    return this._passwordHash
  }

  get lastLogin(): Date | undefined {
    return this._lastLogin
  }

  get expiredAt(): Date | undefined {
    return this._expiredAt
  }

  get resetPasswordToken(): string | undefined {
    return this._resetPasswordToken
  }

  get resetPasswordCode(): string | undefined {
    return this._resetPasswordCode
  }

  toPersistenceObject(): UserCredentialType.Output {
    return {
      lastLogin: this.lastLogin,
      passwordHash: this.passwordHash,
      expiredAt: this.expiredAt,
      resetPasswordToken: this.resetPasswordToken,
      resetPasswordCode: this.resetPasswordCode,
    }
  }

  /**
   * Checks if another Identity is equal to the current one.
   * @param other - Another Identity instance.
   * @returns True if both identities are equal, false otherwise.
   */
  equals(other: UserCredentialType.Input): boolean {
    if (!other) {
      return false
    } else if (other.id === undefined) {
      return false
    } else {
      return this._id.equals(IdentityVo.create(other.id))
    }
  }
}
