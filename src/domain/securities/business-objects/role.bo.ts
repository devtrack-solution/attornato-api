import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { RoleType } from '@/domain/securities/types/role.type'
import { Permission } from '@/domain/securities/business-objects/permission.bo'

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
      this._permissions = data?.permissions?.length > 0 ? data.permissions.map((p) => new Permission(p)) : []
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

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .hasNoWhiteSpace()
      .max(50)
      .required()
      .of({ value: this._description, fieldName: 'description' })
      .max(100)
      .required()
      .of({ value: this._level, fieldName: 'level' })
      .min(0)
      .max(100)
      .required()
      .build('Failed to validate role rules')
  }
}
