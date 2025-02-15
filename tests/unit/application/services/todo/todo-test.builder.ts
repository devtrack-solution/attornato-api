import { IdentityVo } from '@/core/domain/value-objects/identity.vo'
import { TodoType } from '@/domain/todo/types/todo.type'

export class TodoTestBuilder {
  private id: string = IdentityVo.generate().toString()
  private name: string = 'Valid Task'
  private email: string = 'valid@company.com'
  private age: number = 25
  private birthday: Date = new Date('2000-01-01T00:00:00')
  private enable: boolean = true
  private height: number = 170
  private createdAt: Date = new Date()
  private updatedAt: Date = new Date()
  private deletedAt: Date | undefined
  private createdUserId: string = IdentityVo.generate().toString()
  private lastUpdatedUserId: string = IdentityVo.generate().toString()

  static create(): TodoTestBuilder {
    return new TodoTestBuilder()
  }

  withId(id: string): this {
    this.id = id
    return this
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  withEmail(email: string): this {
    this.email = email
    return this
  }

  withAge(age: number): this {
    this.age = age
    return this
  }

  withBirthday(birthday: Date): this {
    this.birthday = birthday
    return this
  }

  withHeight(height: number): this {
    this.height = height
    return this
  }

  withEnable(enable: boolean): this {
    this.enable = enable
    return this
  }

  withDeletedAt(deletedAt: Date | undefined): this {
    this.deletedAt = deletedAt
    return this
  }

  withCreatedUserId(createdUserId: string): this {
    this.createdUserId = createdUserId
    return this
  }

  withLastUpdatedUserId(lastUpdatedUserId: string): this {
    this.lastUpdatedUserId = lastUpdatedUserId
    return this
  }

  build(): TodoType.Input {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      birthday: this.birthday,
      enable: this.enable,
      height: this.height,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      createdUserId: this.createdUserId,
      lastUpdatedUserId: this.lastUpdatedUserId,
    }
  }

  // ✅ Valid Todo (Success Case)
  static getSuccess(): TodoType.Input {
    return TodoTestBuilder.create().build()
  }

  // ❌ Fail Case: Empty name
  static getFailOnEmptyName(): TodoType.Input {
    return TodoTestBuilder.create().withName('').build()
  }

  // ❌ Fail Case: Invalid email format
  static getFailOnEmailInvalid(): TodoType.Input {
    return TodoTestBuilder.create().withEmail('invalid-email').build()
  }

  // ❌ Fail Case: Invalid Age (Negative or too high)
  static getFailOnInvalidAge(): TodoType.Input {
    return TodoTestBuilder.create().withAge(-5).build()
  }

  // ❌ Fail Case: Invalid Height
  static getFailOnInvalidHeight(): TodoType.Input {
    return TodoTestBuilder.create().withHeight(5).build()
  }

  // ❌ Fail Case: Deleted Todo
  static getFailOnDeletedTodo(): TodoType.Input {
    return TodoTestBuilder.create().withDeletedAt(new Date()).build()
  }
}
