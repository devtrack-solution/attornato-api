import { TodoType } from '@/domain/todo/types/todo.type'
import { Mapper } from '@/domain/mappers/mapper'
import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { ValidationBuilder, Validator } from '@/core/domain/validators'
import { IEntity } from "@/core/domain/business-objects/entity.bo";


/**
 * Interface representing a Todo entity with methods for equality check,
 * persistence conversion, and JSON conversion.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface ITodo extends IEntity<TodoType.Input, TodoType.Output> {}

export class Todo extends Mapper<TodoType.Repository, ITodo> implements ITodo, Validator {
  private _id!: IdentityVo // deve ser único
  private _name!: string // deve exitir não ser nulo e ter no máximo 200 caracteres
  private _email!: string
  private _age!: number // deve ser maior que 0 e menor que 130
  private _birthday!: Date // deve ser uma data válida no formato YYYY-MM-DDTHH:MM:SS e deve ser menor que a data atual
  private _enable!: boolean // deve ser um booleano
  private _height!: number // deve ser maior que 10 e menor que 300 metros

  private loadData(data: TodoType.Input): TodoType.Output {
    this._id = data?.id ? IdentityVo.create(data.id) : IdentityVo.generate()
    this._name = data.name
    this._email = data.email
    this._age = data.age
    this._birthday = data.birthday
    this._enable = data.enable
    this._height = data.height

    return this
  }

  constructor(props: TodoType.Input) {
    super()
    this.loadData(props)
    this.validate()
  }

  get id(): string {
    return this._id.toString()
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get age(): number {
    return this._age
  }

  get birthday(): Date {
    return this._birthday
  }

  get enable(): boolean {
    return this._enable
  }

  get height(): number {
    return this._height
  }

  toPersistence(): TodoType.Output {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      birthday: this.birthday,
      enable: this.enable,
      height: this.height,
    }
  }

  toJson(): TodoType.Output {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      birthday: this.birthday,
      enable: this.enable,
      height: this.height,
    }
  }

  static override fromRepositoryToDomain(data: TodoType.Repository): TodoType.Output {
    return new Todo(data)
  }

  /**
   * Checks if another Identity is equal to the current one.
   * @param other - Another Identity instance.
   * @returns True if both identities are equal, false otherwise.
   */
  equals(other: TodoType.Input): boolean {
    if (!other) {
      return false
    } else if (other.id === undefined) {
      return false
    } else {
      return this._id.equals(IdentityVo.create(other.id))
    }
  }

  validate(): void {
    ValidationBuilder.of({ value: this._birthday, fieldName: 'birthday' })
      .dateFormat([{ regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, description: 'YYYY-MM-DDTHH:MM:SS' }])
      .required()
      .build()
  }
}
