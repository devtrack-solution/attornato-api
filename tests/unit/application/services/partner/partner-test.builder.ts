import { PartnerType } from '@/domain/process/component/partner/types/partner.type'

export class PartnerTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): PartnerTestBuilder {
    return new PartnerTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): PartnerType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Partner (Success Case)
  static getSuccess(): PartnerType.Input {
    return PartnerTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): PartnerType.Input {
    return PartnerTestBuilder.create().withName('').build()
  }
}
