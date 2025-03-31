import { ProfileType } from '@/domain/profile/types/profile.type'

export class ProfileTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): ProfileTestBuilder {
    return new ProfileTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): ProfileType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid Profile (Success Case)
  static getSuccess(): ProfileType.Input {
    return ProfileTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): ProfileType.Input {
    return ProfileTestBuilder.create().withName('').build()
  }
}
