import { FreeFieldType } from '@/domain/client/person/contact-person/free-field/types/free-field.type'

export class FreeFieldTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): FreeFieldTestBuilder {
    return new FreeFieldTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): FreeFieldType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid FreeField (Success Case)
  static getSuccess(): FreeFieldType.Input {
    return FreeFieldTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): FreeFieldType.Input {
    return FreeFieldTestBuilder.create().withName('').build()
  }
}
