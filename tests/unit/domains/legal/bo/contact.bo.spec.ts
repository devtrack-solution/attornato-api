import { Contact } from '@/domain/communication-address/contact/business-objects/contact.bo'
import { CommunicationChannel } from '@/domain/communication-channel/business-objects/communication-channel.bo'
import { EntityBadDataLoadException, EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Contact BO', () => {
  const validChannel = new CommunicationChannel({
    id: uuidv4(),
    name: 'Telefone',
  })

  const validInput = {
    id: uuidv4(),
    value: '(11) 91234-5678',
    communicationChannel: validChannel,
  }

  it('should create a valid Contact instance', () => {
    const contact = new Contact(validInput)

    expect(contact).toBeInstanceOf(Contact)
    expect(contact.value).toBe(validInput.value)
    expect(contact.communicationChannel).toBeInstanceOf(CommunicationChannel)
    expect(contact.communicationChannel.id).toBe(validChannel.id)
  })

  it('should serialize to persistence object', () => {
    const contact = new Contact(validInput)
    const output = contact.toPersistenceObject()

    expect(output).toEqual({
      id: validInput.id.toString(),
      value: validInput.value,
      communicationChannel: {
        id: validChannel.id.toString(),
        name: validChannel.name,
      },
    })
  })

  it('should throw error when value is missing', () => {
    const invalidInput = { ...validInput, value: '' }
    expect(() => new Contact(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('should throw error when communicationChannel is missing', () => {
    const invalidInput = { ...validInput, communicationChannel: null }
    expect(() => new Contact(invalidInput as any)).toThrow(EntityBadDataLoadException)
  })
})
