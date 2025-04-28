import { DetailsType } from '@/domain/process/details/types/details.type'

export class DetailsTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): DetailsTestBuilder {
    return new DetailsTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): DetailsType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Details (Success Case)
  static getSuccess(): DetailsType.Input {
    return DetailsTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): DetailsType.Input {
    return DetailsTestBuilder.create().withName('').build()
  }
}
