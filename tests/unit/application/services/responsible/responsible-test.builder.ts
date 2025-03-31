import { ResponsibleType } from '@/domain/responsible/types/responsible.type'

export class ResponsibleTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): ResponsibleTestBuilder {
    return new ResponsibleTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): ResponsibleType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Responsible (Success Case)
  static getSuccess(): ResponsibleType.Input {
    return ResponsibleTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): ResponsibleType.Input {
    return ResponsibleTestBuilder.create().withName('').build()
  }
}
