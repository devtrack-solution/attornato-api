import { OriginType } from '@/domain/origin/types/origin.type'

export class OriginTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): OriginTestBuilder {
    return new OriginTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): OriginType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Origin (Success Case)
  static getSuccess(): OriginType.Input {
    return OriginTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): OriginType.Input {
    return OriginTestBuilder.create().withName('').build()
  }
}
