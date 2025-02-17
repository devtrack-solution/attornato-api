import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { RoleType } from '@/domain/todo/types/role.type'
import { Permission } from '@/domain/todo/business-objects/permission.bo'

export interface IRole extends IBusinessObject<RoleType.Input, RoleType.Output> {}

export class Role extends BaseBusinessObject<RoleType.Repository, RoleType.Output> implements IRole, IValidator {
  private _name!: string
  private _description!: string
  private _level!: number
  private _permissions!: Permission[]

  private loadData(data: RoleType.Input): RoleType.Output {
    try {
      this._name = data.name
      this._description = data.description
      this._level = data.level
      this._permissions = data.permissions.map((p) => new Permission(p))
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading role entity`))
    }
    return this
  }

  constructor(props: RoleType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get level(): number {
    return this._level
  }

  get permissions(): Permission[] {
    return this._permissions
  }

  toPersistenceObject(): RoleType.Output {
    return {
      name: this.name,
      description: this.description,
      level: this.level,
      permissions: this.permissions.map((p) => p.toPersistence()),
    }
  }

  equals(other: RoleType.Input): boolean {
    if (!other || other.id === undefined) {
      return false
    }
    return this._id.equals(IdentityVo.create(other.id))
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).required().of({ value: this._level, fieldName: 'level' }).required().build('Failed to validate role rules')
  }
}
