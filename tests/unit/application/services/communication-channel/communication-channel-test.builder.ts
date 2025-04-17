import { CommunicationChannelType } from '@/domain/communication-channel/types/communication-channel.type'

export class CommunicationChannelTestBuilder {
  private name: string = 'READ_GROUP-CUSTOMER'

  static create(): CommunicationChannelTestBuilder {
    return new CommunicationChannelTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  build(): CommunicationChannelType.Input {
    return {
      name: this.name,
    }
  }

  // ✅ Valid CommunicationChannel (Success Case)
  static getSuccess(): CommunicationChannelType.Input {
    return CommunicationChannelTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): CommunicationChannelType.Input {
    return CommunicationChannelTestBuilder.create().withName('').build()
  }
}
