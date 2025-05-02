import { DetailType } from '@/domain/process/component/detail/types/detail.type'

export class DetailTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): DetailTestBuilder {
    return new DetailTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): DetailType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Detail (Success Case)
  static getSuccess(): DetailType.Input {
    return DetailTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): DetailType.Input {
    return DetailTestBuilder.create().withName('').build()
  }
}
