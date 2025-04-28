import { PrognosisType } from '@/domain/process/prognosis/types/prognosis.type'

export class PrognosisTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): PrognosisTestBuilder {
    return new PrognosisTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): PrognosisType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Prognosis (Success Case)
  static getSuccess(): PrognosisType.Input {
    return PrognosisTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): PrognosisType.Input {
    return PrognosisTestBuilder.create().withName('').build()
  }
}
