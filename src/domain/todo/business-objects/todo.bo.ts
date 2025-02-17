import { TodoType } from '@/domain/todo/types/todo.type'
import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'

/**
 * Interface representing a Todo entity with methods for equality check,
 * persistence conversion, and JSON conversion.
 *
 * @template Y - The type of the input data.
 * @template T - The type of the output data.
 */
export interface ITodo extends IBusinessObject<TodoType.Input, TodoType.Output> {}

export class Todo extends BaseBusinessObject<TodoType.Repository, TodoType.Output> implements ITodo, IValidator {
  private _name!: string // deve exitir não ser nulo e ter no máximo 200 caracteres
  private _email!: string
  private _age!: number // deve ser maior que 0 e menor que 130
  private _birthday!: Date // deve ser uma data válida no formato YYYY-MM-DDTHH:MM:SS e deve ser menor que a data atual
  private _height!: number // deve ser maior que 10 e menor que 300 metros

  private loadData(data: TodoType.Input): TodoType.Output {
    try {
      this._name = data.name
      this._email = data.email
      this._age = data.age
      this._birthday = data.birthday
      this._height = data.height
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Erro ao carregar os dados da entidade Todo`))
    }

    return this
  }

  constructor(props: TodoType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
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

  update(data: Partial<TodoType.Input>): Todo {
    this._name = data.name || this._name
    this._email = data.email || this._email
    this._age = data.age || this._age
    this._birthday = data.birthday || this._birthday
    this._height = data.height || this._height

    this.validate()
    return this
  }

  toPersistenceObject(): TodoType.Output {
    return {
      name: this.name,
      email: this.email,
      age: this.age,
      birthday: this.birthday,
      height: this.height,
    }
  }

  static override fromRepositoryToDomain(data: TodoType.Repository): Todo {
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
      /*.dateFormat([
        {
          regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)\.\d{3}Z$/,
          description: 'YYYY-MM-DDTHH:MM:SS.SSSZ',
        },
      ])*/
      .required()
      .of({ value: this._name, fieldName: 'name' })
      .required()
      .of({ value: this._email, fieldName: 'email' })
      .required()
      .isEmail()
      .emailBelongsToCorporateCompany()
      .build('Falha ao validar regras de negocio para criar uma task')
  }
}
