import { CommunicationChannel } from '@/domain/client/component/person/communication-address/contact/communication-channel/business-objects/communication-channel.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('CommunicationChannel BO', () => {
  const object = {
    id: uuidv4(),
    name: 'Telefone',
  }

  it('should create a valid CommunicationChannel without id', () => {
    const channel = new CommunicationChannel(object)
    expect(channel).toBeInstanceOf(CommunicationChannel)
    expect(channel.name).toBe('Telefone')
  })

  it('should serialize to persistence object', () => {
    const communicationChannel = new CommunicationChannel(object)
    const output = communicationChannel.toPersistenceObject()

    expect(output).toEqual({
      id: object.id.toString(),
      name: object.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new CommunicationChannel(invalidInput)).toThrow(EntityInvalidFormatException)
  })
})
