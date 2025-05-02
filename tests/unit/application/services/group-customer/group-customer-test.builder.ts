import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'

export class GroupCustomerTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): GroupCustomerTestBuilder {
    return new GroupCustomerTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): GroupCustomerType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid GroupCustomer (Success Case)
  static getSuccess(): GroupCustomerType.Input {
    return GroupCustomerTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): GroupCustomerType.Input {
    return GroupCustomerTestBuilder.create().withName('').build()
  }
}
