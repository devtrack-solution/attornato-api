import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { IMapper } from '@/domain/mappers/mapper'
import { BaseType } from '@/core/domain/types/base.type'
import { PermissionType } from '@/domain/todo/types/permission.type'
import { TodoType } from '@/domain/todo/types/todo.type'

/**
 * Interface representing a generic entity with methods for equality check,
 * persistence conversion, and JSON conversion.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface IBusinessObject<Y, T> {
  /**
   * Checks if another entity is equal to the current one.
   *
   * @param other - Another entity instance.
   * @returns True if both business-objects are equal, false otherwise.
   */
  equals(other: Y): boolean
}

export abstract class BaseBusinessObject<Y, T> implements IBusinessObject<Y, T>, IMapper<Y, T> {
  protected _id!: IdentityVo
  protected _lastUpdatedUserId?: IdentityVo
  protected _createdUserId?: IdentityVo
  protected _createdAt?: Date
  protected _updatedAt?: Date
  protected _deletedAt?: Date
  protected _enable!: boolean

  private load(props: BaseType.Input): void {
    this._id = props.id ? IdentityVo.create(props.id) : IdentityVo.generate()
    this._enable = props.enable || true
    if (props.userId) {
      this._lastUpdatedUserId = IdentityVo.create(props.userId)
      this._createdUserId = IdentityVo.create(props.userId)
    } else {
      this._lastUpdatedUserId = props.lastUpdatedUserId ? IdentityVo.create(props.lastUpdatedUserId) : undefined
      this._createdUserId = props.createdUserId ? IdentityVo.create(props.createdUserId) : undefined
    }
  }

  protected constructor(protected props: BaseType.Input) {
    this.load(props)
    /*
      this._lastUpdatedUserId = props.lastUpdatedUserId ? IdentityVo.create(props.lastUpdatedUserId) : undefined
      this._createdUserId = props.createdUserId ? IdentityVo.create(props.createdUserId) : undefined
      this._createdAt = props.createdAt || new Date()
      this._updatedAt = props.updatedAt || new Date()
      this._deletedAt = props.deletedAt || undefined
      this._enable = props.enable || true
    */
  }

  /**
   * Checks if another entity is equal to the current one.
   *
   * @param other - Another entity instance.
   * @returns True if both business-objects are equal, false otherwise.
   */
  // abstract equals(other: Y): boolean
  equals(other: Y): boolean {
    if (!other || (other as any).id === undefined) {
      return false
    }
    return this._id.equals(IdentityVo.create((other as any).id))
  }

  /**
   * Converts the entity to a persistence format.
   *
   * @returns The entity in persistence format.
   */
  protected abstract toPersistenceObject(): Y

  /**
   * Converts the entity to a persistence format.
   *
   * @returns The entity in persistence format.
   */
  public toPersistence(): BaseType.Input & Y {
    return {
      id: this._id.toString(),
      lastUpdatedUserId: this._lastUpdatedUserId?.toString(),
      createdUserId: this._createdUserId?.toString(),
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      enable: this._enable,
      ...this.toPersistenceObject(),
    }
  }

  /**
   * Converts the entity to a JSON format.
   *
   * @returns The entity in JSON format.
   */
  // abstract toJson(): T
  public toJson(): T {
    return this.toPersistence() as unknown as T
  }

  /**
   * Implement the fromRepositoryToDomain method for the specific entity.
   */
  static fromRepositoryToDomain(_repositoryData: any): any {
    throw new Error('fromRepositoryToDomain must be implemented in the derived class.')
  }
}
