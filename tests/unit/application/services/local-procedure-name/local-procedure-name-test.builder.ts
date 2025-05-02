import { LocalProcedureNameType } from '@/domain/process/component/local-procedure-name/types/local-procedure-name.type'

export class LocalProcedureNameTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): LocalProcedureNameTestBuilder {
    return new LocalProcedureNameTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): LocalProcedureNameType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid LocalProcedureName (Success Case)
  static getSuccess(): LocalProcedureNameType.Input {
    return LocalProcedureNameTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): LocalProcedureNameType.Input {
    return LocalProcedureNameTestBuilder.create().withName('').build()
  }
}
