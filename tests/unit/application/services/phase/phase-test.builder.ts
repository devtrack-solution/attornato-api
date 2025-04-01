import { PhaseType } from '@/domain/phase/types/phase.type'

export class PhaseTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): PhaseTestBuilder {
    return new PhaseTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): PhaseType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Phase (Success Case)
  static getSuccess(): PhaseType.Input {
    return PhaseTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): PhaseType.Input {
    return PhaseTestBuilder.create().withName('').build()
  }
}
