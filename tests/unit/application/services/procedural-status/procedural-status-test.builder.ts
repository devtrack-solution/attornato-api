import { ProceduralStatusType } from '@/domain/process/procedural-status/types/procedural-status.type'

export class ProceduralStatusTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): ProceduralStatusTestBuilder {
    return new ProceduralStatusTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): ProceduralStatusType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid ProceduralStatus (Success Case)
  static getSuccess(): ProceduralStatusType.Input {
    return ProceduralStatusTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): ProceduralStatusType.Input {
    return ProceduralStatusTestBuilder.create().withName('').build()
  }
}
