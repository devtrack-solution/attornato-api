import { GroupProcessType } from '@/domain/process/group-process/types/group-process.type'

export class GroupProcessTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): GroupProcessTestBuilder {
    return new GroupProcessTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): GroupProcessType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid GroupProcess (Success Case)
  static getSuccess(): GroupProcessType.Input {
    return GroupProcessTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): GroupProcessType.Input {
    return GroupProcessTestBuilder.create().withName('').build()
  }
}
