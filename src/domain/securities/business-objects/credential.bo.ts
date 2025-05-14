import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { Role } from '@/domain/securities/business-objects/role.bo'
import { PasswordVo } from '@/core/domain/value-objects/password.vo'
import { IValidator, ValidationBuilder } from '@/core/domain/validators'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { RoleType } from '@/domain/securities/types/role.type'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { PermissionConstants } from '@/commons/securities/permission.constants'

export interface ICredential extends IBusinessObject<CredentialType.Input, CredentialType.Output> {}

export class Credential extends BaseBusinessObject<CredentialType.Repository, CredentialType.Output> implements ICredential, IValidator {
  private _username!: string
  private _passwordHash?: PasswordVo
  private _lastLogin: Date | any
  private _expiredAt: Date | any
  private _expiredCodeAt: Date | any
  private _requestNewPassword?: boolean
  private _resetPasswordToken?: string | any
  private _resetPasswordCode?: string | any
  private _roles!: Role[]

  private loadData(data: CredentialType.Input): CredentialType.Output {
    try {
      this._username = data.username
      this._passwordHash = new PasswordVo(data.password)
      this._lastLogin = data.lastLogin
      this._expiredAt = data.expiredAt
      this._expiredCodeAt = data.expiredCodeAt
      this._requestNewPassword = data?.requestNewPassword ?? true
      this._resetPasswordToken = data.resetPasswordToken
      this._resetPasswordCode = data.resetPasswordCode
      this._roles = (data?.roles ?? []).map((role: RoleType.Input) => new Role(role));
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading credential entity`))
    }
    return this
  }

  constructor(props: CredentialType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get username(): string {
    return this._username
  }

  get requestNewPassword(): boolean {
    return this._requestNewPassword || false
  }

  get passwordHash(): string | any {
    return this._passwordHash?.value
  }

  get lastLogin(): Date | null {
    return this._lastLogin || null
  }

  get expiredAt(): Date | null {
    return this._expiredAt || null
  }

  get expiredCodeAt(): Date | null {
    return this._expiredCodeAt || null
  }

  get resetPasswordToken(): string | null {
    return this._resetPasswordToken || null
  }

  get resetPasswordCode(): string | null {
    return this._resetPasswordCode || null
  }

  get roles(): Role[] {
    return this._roles
  }

  toPersistenceObject(): CredentialType.Persistence {
    return {
      id: this.id,
      username: this.username,
      lastLogin: this.lastLogin,
      passwordHash: this.passwordHash,
      expiredAt: this.expiredAt,
      expiredCodeAt: this.expiredCodeAt,
      resetPasswordToken: this.resetPasswordToken,
      resetPasswordCode: this.resetPasswordCode,
    }
  }

  toPersistenceRole(): CredentialType.PersistenceRole[] {
    return (
      this._roles?.map((role: Role) => {
        return {
          credentialId: this.id,
          roleId: role.id,
        }
      }) || []
    )
  }

  override toJson(): CredentialType.Output {
    const result = {
      id: this.id,
      username: this.username,
      lastLogin: this.lastLogin,
      expiredAt: this.expiredAt,
      expiredCodeAt: this.expiredCodeAt,
      resetPasswordToken: this.resetPasswordToken,
      resetPasswordCode: this.resetPasswordCode,
      roles: this._roles.map((role) => role.toJson()),
    }
    if (this._requestNewPassword) {
      result.roles = result.roles.map((role: RoleType.Input) => {
        const permissions = role.permissions.find((permission: PermissionType.Output) => permission.name === PermissionConstants.PERMISSION_UPDATE_PASSWORD);
        return { ...role, permissions }
      })
    }
    return result
  }

  validate(): void {
    ValidationBuilder.of({ value: this._username, fieldName: 'username' })
      .hasNoWhiteSpace()
      .min(3)
      .max(50)
      .required()
      .of({ value: this._passwordHash?.toString(), fieldName: 'passwordHash' })
      .max(100)
      .required()
      .of({ value: this._lastLogin, fieldName: 'lastLogin' })
      .isDateOrNull()
      .of({ value: this._expiredAt, fieldName: 'expiredAt' })
      .isDateOrNull()
      .build('Failed to validate role rules')
  }
}
