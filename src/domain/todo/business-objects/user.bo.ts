import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { UserStatus, UserType } from '@/domain/todo/types/user.type'
import { Role } from '@/domain/todo/business-objects/role.bo'
import { UserCredential } from '@/domain/todo/business-objects/user-credential.bo'

export interface IUser extends IBusinessObject<UserType.Input, UserType.Output> {}

export class User extends BaseBusinessObject<UserType.Repository, UserType.Output> implements IUser, IValidator {
  private _username!: string
  private _email!: string
  private _status!: UserStatus
  private _userCredential!: UserCredential
  private _roles!: Role[]

  private loadData(data: UserType.Input): UserType.Output {
    try {
      this._username = data.username
      this._email = data.email
      this._status = data.status
      this._userCredential = data.userCredential
      this._roles = data.roles.map((role) => new Role(role))
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Erro ao carregar os dados da entidade User`))
    }

    return this
  }

  constructor(props: UserType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get username(): string {
    return this._username
  }

  get email(): string {
    return this._email
  }

  get status(): UserStatus {
    return this._status
  }

  get userCredential(): UserCredential {
    return this._userCredential
  }

  get roles(): Role[] {
    return this._roles
  }

  update(data: Partial<UserType.Input>): User {
    this._username = data.username || this._username
    this._email = data.email || this._email
    this._status = data.status || this._status
    this._roles = data.roles ? data.roles.map((role) => new Role(role)) : this._roles

    this.validate()
    return this
  }

  toPersistence(): UserType.Output {
    return {
      id: this._id?.toString(),
      username: this.username,
      email: this.email,
      status: this.status,
      userCredential: this.userCredential.toPersistence(),
      roles: this.roles.map((role) => role.toPersistence()),
      createdUserId: this._createdUserId?.toString(),
      lastUpdatedUserId: this._lastUpdatedUserId?.toString(),
    }
  }

  toJson(): UserType.Output {
    return {
      id: this._id?.toString(),
      username: this.username,
      email: this.email,
      status: this.status,
      userCredential: this.userCredential.toJson(),
      roles: this.roles.map((role) => role.toJson()),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      lastUpdatedUserId: this._lastUpdatedUserId?.toString(),
      createdUserId: this._createdUserId?.toString(),
    }
  }

  equals(other: UserType.Input): boolean {
    if (!other || other.id === undefined) {
      return false
    }
    return this._id.equals(IdentityVo.create(other.id))
  }

  validate(): void {
    ValidationBuilder.of({ value: this._username, fieldName: 'username' })
      .required()
      .of({ value: this._email, fieldName: 'email' })
      .required()
      .isEmail()
      .build('Falha ao validar regras de negócio para criar um usuário')
  }
}
