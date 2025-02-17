import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { PermissionType } from '@/domain/todo/types/permission.type'

export interface IPermission extends IBusinessObject<PermissionType.Input, PermissionType.Output> {}

export class Permission extends BaseBusinessObject<PermissionType.Repository, PermissionType.Output> implements IPermission, IValidator {
  private _name!: string
  private _description!: string
  private _resource!: string

  private loadData(data: PermissionType.Input): PermissionType.Output {
    try {
      this._name = data.name
      this._description = data.description
      this._resource = data.resource
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading permission entity`))
    }
    return this
  }

  constructor(props: PermissionType.Input) {
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

  get resource(): string {
    return this._resource
  }

  protected toPersistenceObject(): PermissionType.Output {
    return {
      name: this.name,
      description: this.description,
      resource: this.resource,
    }
  }

  equals(other: PermissionType.Input): boolean {
    if (!other || other.id === undefined) {
      return false
    }
    return this._id.equals(IdentityVo.create(other.id))
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .of({ value: this._description, fieldName: 'description' })
      .required()
      .of({ value: this._resource, fieldName: 'resource' })
      .required()
      .build('Failed to validate permission rules')
  }
}
