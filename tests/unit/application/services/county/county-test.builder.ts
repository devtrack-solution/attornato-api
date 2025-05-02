import { CountyType } from '@/domain/process/component/county/types/county.type'

export class CountyTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): CountyTestBuilder {
    return new CountyTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): CountyType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid County (Success Case)
  static getSuccess(): CountyType.Input {
    return CountyTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): CountyType.Input {
    return CountyTestBuilder.create().withName('').build()
  }
}
