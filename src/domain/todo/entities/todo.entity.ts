import { TodoTypes } from "@/domain/todo/types/todo.types";
import { Mapper } from "@/domain/mappers/mapper";
import { IdentityVo } from "@/core/domain/value-objects/identity.vo";
import { ValidationBuilder, Validator } from "@/core/domain/validators";


export interface ITodo extends  TodoTypes.Input {}

export class Todo extends Mapper<TodoTypes.Repository, ITodo> implements ITodo, Validator {
  private _id!: IdentityVo
  private _name!: string
  private _age!: number
  private _birthday!: Date
  private _isActive!: boolean
  private _height!: number

  private loadData(data: TodoTypes.Input): ITodo {
    this._id = data?.id ? IdentityVo.create(data.id) : IdentityVo.generate()
    this._name = data.name
    this._age = data.age
    this._birthday = data.birthday
    this._isActive = data.isActive
    this._height = data.height

    return this
  }

  constructor(props: TodoTypes.Input) {
    super()
    this.loadData(props)
  }

  get id(): string {
    return this._id.toString()
  }

  get name(): string {
    return this._name
  }

  get age(): number {
    return this._age
  }

  get birthday(): Date {
    return this._birthday
  }

  get isActive(): boolean {
    return this._isActive
  }

  get height(): number {
    return this._height
  }

  toPersistence(): TodoTypes.Output {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      birthday: this.birthday,
      isActive: this.isActive,
      height: this.height,
    }
  }

  static override fromRepositoryToDomain(data: TodoTypes.Repository): ITodo {
    return new Todo(data)
  }

  /**
   * Checks if another Identity is equal to the current one.
   * @param other - Another Identity instance.
   * @returns True if both identities are equal, false otherwise.
   */
  equals(other: ITodo): boolean {
    if (!other) {
      return false
    } else if (other.id === undefined) {
      return false
    } else {
      return this._id.equals(IdentityVo.create(other.id))
    }
  }

  validate(): Error | undefined {
    ValidationBuilder.of({ value: this._birthday, fieldName: 'birthday' }).dateFormat([{ regex: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])T([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$', description: 'YYYY-MM-DDTHH:MM:SS'}]).required().build()
    return undefined;
  }

}
