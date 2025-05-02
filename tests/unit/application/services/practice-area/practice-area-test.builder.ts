import { PracticeAreaType } from '@/domain/process/component/practice-area/types/practice-area.type'

export class PracticeAreaTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): PracticeAreaTestBuilder {
    return new PracticeAreaTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): PracticeAreaType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid PracticeArea (Success Case)
  static getSuccess(): PracticeAreaType.Input {
    return PracticeAreaTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): PracticeAreaType.Input {
    return PracticeAreaTestBuilder.create().withName('').build()
  }
}
