import { LocatorType } from '@/domain/process/component/locator/types/locator.type'

export class LocatorTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): LocatorTestBuilder {
    return new LocatorTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): LocatorType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Locator (Success Case)
  static getSuccess(): LocatorType.Input {
    return LocatorTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): LocatorType.Input {
    return LocatorTestBuilder.create().withName('').build()
  }
}
