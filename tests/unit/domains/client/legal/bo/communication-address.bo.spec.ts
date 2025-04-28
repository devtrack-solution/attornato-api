import { CommunicationAddress } from '@/domain/client/person/communication-address/business-objects/communication-address.bo'
import { Contact } from '@/domain/client/person/communication-address/contact/business-objects/contact.bo'
import { v4 as uuidv4 } from 'uuid'

describe('CommunicationAddress BO', () => {
  const validContact = new Contact({
    id: uuidv4(),
    value: '(11) 91234-5678',
    communicationChannel: {
      id: uuidv4(),
      name: 'Telefone',
    },
  })

  const mockInput = {
    id: uuidv4(),
    zipCode: '12345678',
    street: 'Rua A',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    contacts: [validContact],
  }

  it('should create CommunicationAddress successfully', () => {
    const address = new CommunicationAddress(mockInput)
    expect(address).toBeInstanceOf(CommunicationAddress)
    expect(address.contacts.length).toBe(1)
    expect(address.zipCode).toBe('12345678')
    expect(address.street).toBe('Rua A')
  })

  it('should return correct persistence object', () => {
    const address = new CommunicationAddress(mockInput)
    const output = address.toPersistenceObject()

    expect(output).toEqual({
      id: mockInput.id?.toString(),
      zipCode: '12345678',
      street: 'Rua A',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      contacts: [
        {
          id: validContact.id,
          value: validContact.value,
          communicationChannel: {
            id: validContact.communicationChannel.id,
            name: validContact.communicationChannel.name,
          },
        },
      ],
    })
  })

  it('should throw error when required fields are missing', () => {
    const invalidInput = {
      zipCode: '',
      street: '',
      neighborhood: '',
      city: '',
      state: '',
      contacts: [],
    }

    expect(() => new CommunicationAddress(invalidInput as any)).toThrow()
  })
})
