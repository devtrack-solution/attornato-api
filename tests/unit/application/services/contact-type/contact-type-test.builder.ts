import { ContactTypeType } from '@/domain/contact-type/types/contact-type.type'

export class ContactTypeTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): ContactTypeTestBuilder {
    return new ContactTypeTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): ContactTypeType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid ContactType (Success Case)
  static getSuccess(): ContactTypeType.Input {
    return ContactTypeTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): ContactTypeType.Input {
    return ContactTypeTestBuilder.create().withName('').build()
  }
}
