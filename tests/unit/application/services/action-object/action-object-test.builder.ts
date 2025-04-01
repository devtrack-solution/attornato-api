import { ActionObjectType } from '@/domain/action-object/types/action-object.type'

export class ActionObjectTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): ActionObjectTestBuilder {
    return new ActionObjectTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): ActionObjectType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid ActionObject (Success Case)
  static getSuccess(): ActionObjectType.Input {
    return ActionObjectTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): ActionObjectType.Input {
    return ActionObjectTestBuilder.create().withName('').build()
  }
}
