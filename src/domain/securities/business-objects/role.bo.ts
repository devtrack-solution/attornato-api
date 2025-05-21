import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { RoleType } from '@/domain/securities/types/role.type'
import { Permission } from '@/domain/securities/business-objects/permission.bo'
import { BadRequestException, Logger } from '@nestjs/common'

export interface IRole extends IBusinessObject<RoleType.Input, RoleType.Output> {}

export class Role extends BaseBusinessObject<RoleType.Repository, RoleType.Output> implements IRole, IValidator {
  private readonly logger = new Logger(Role.name)

  private _name!: string
  private _description!: string
  private _level!: number
  private _permissionIds!: string[]
  private _permissions!: Permission[]

  private async loadData(data: RoleType.Input): Promise<RoleType.Input> {
    try {
      if (this._permissionIds?.length < 1 && this._permissions?.length < 1) {
        throw new BadRequestException('At least one permission is required')
      }
      this._name = data.name ?? ''
      this._description = data.description ?? ''
      this._level = data.level
      this._permissionIds = data?.permissionIds ?? []
      this._permissions = data?.permissions ?? []
    } catch (e) {
      throw e
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
      .of({ value: this._permissions, fieldName: 'permissions' })
      .of({ value: this._permissionIds, fieldName: 'permissionIds' })
      .build('Failed to validate role rules')
  }
}
