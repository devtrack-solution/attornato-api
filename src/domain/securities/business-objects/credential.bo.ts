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
  private _roles?: Role[]
  private _roleIds!: string[]

  private loadData(data: CredentialType.Input): CredentialType.Output {
    try {
      this._username = data.username
      this._passwordHash = data.passwordHash === undefined ? undefined : new PasswordVo(data.password)
      this._lastLogin = data.lastLogin === undefined ? undefined : data.lastLogin
      this._expiredAt = data.expiredAt === undefined ? undefined : data.expiredAt
      this._expiredCodeAt = data.expiredCodeAt === undefined ? undefined : data.expiredCodeAt
      this._requestNewPassword = data?.requestNewPassword === undefined ? undefined : data.requestNewPassword
      this._resetPasswordToken = data.resetPasswordToken === undefined ? undefined : data.resetPasswordToken
      this._resetPasswordCode = data.resetPasswordCode === undefined ? undefined : data.resetPasswordCode
      this._roleIds = data.roleIds!
      this._roles = data.roles
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading credential entity`))
    }
    return this.toJson()
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

  get roles(): Role[] | [] {
    return this._roles ?? []
  }

  set roles(roles: RoleType.Output[] | []) {
    this._roles = roles.map(role => new Role(role))
  }

  toPersistenceObject(): CredentialType.Persistence {
    return {
      id: this._id.toString(),
      username: this._username,
      roles: this._roles ?? []
    }
  }

  // toPersistenceRole(): CredentialType.PersistenceRole[] {
  //   return (
  //     this._roles?.map((role: Role) => {
  //       return {
  //         credentialId: this.id,
  //         roleId: role.id,
  //       }
  //     }) || []
  //   )
  // }

  validate(): void {
    ValidationBuilder.of({ value: this._username, fieldName: 'username' })
      .hasNoWhiteSpace()
      .min(3)
      .max(50)
      .required()
      .of({ value: this._passwordHash?.toString(), fieldName: 'passwordHash' })
      .of({ value: this._lastLogin, fieldName: 'lastLogin' })
      .of({ value: this._expiredAt, fieldName: 'expiredAt' })
      .of({ value: this._roleIds, fieldName: 'roleIds' })
      .build('Failed to validate role rules')
  }
}
