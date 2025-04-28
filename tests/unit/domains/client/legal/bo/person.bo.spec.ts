import { CommunicationAddress } from '@/domain/client/person/communication-address/business-objects/communication-address.bo'
import { EntityBadDataLoadException, EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'
import { ContactPerson } from '@/domain/client/person/contact-person/business-objects/contact-person.bo'
import { Person } from '@/domain/client/person/business-objects/person.bo'

describe('Person BO', () => {
  const validAddress = new CommunicationAddress({
    id: uuidv4(),
    zipCode: '12345678',
    street: 'Rua A',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    contacts: [
      {
        id: uuidv4(),
        value: '(11) 91234-5678',
        communicationChannel: {
          id: uuidv4(),
          name: 'Telefone',
        },
      },
    ],
  })

  const validContactPerson = new ContactPerson({
    id: uuidv4(),
    note: 'Responsável jurídico',
    freeFieldOne: 'Extra',
    freeField: { id: uuidv4(), name: 'Observação' },
  })

  const validInput = {
    id: uuidv4(),
    clientId: 'client-abc',
    communicationAddress: validAddress,
    contactPerson: validContactPerson,
  }

  it('should create a valid Person instance', () => {
    const person = new Person(validInput)
    expect(person).toBeInstanceOf(Person)
    expect(person.clientId).toBe(validInput.clientId)
    expect(person.communicationAddress).toBeInstanceOf(CommunicationAddress)
    expect(person.contactPerson).toBeInstanceOf(ContactPerson)
  })

  it('should serialize to persistence object', () => {
    const person = new Person(validInput)
    const output = person.toPersistenceObject()

    expect(output).toEqual({
      id: validInput.id.toString(),
      clientId: validInput.clientId,
      communicationAddress: {
        id: validInput.communicationAddress.id.toString(),
        zipCode: validInput.communicationAddress.zipCode,
        street: validInput.communicationAddress.street,
        neighborhood: validInput.communicationAddress.neighborhood,
        city: validInput.communicationAddress.city,
        state: validInput.communicationAddress.state,
        contacts: [
          {
            id: validInput.communicationAddress.contacts[0]?.id?.toString(),
            value: validInput.communicationAddress.contacts[0].value,
            communicationChannel: {
              id: validInput.communicationAddress.contacts[0].communicationChannel.id?.toString(),
              name: validInput.communicationAddress.contacts[0].communicationChannel.name,
            },
          },
        ],
      },
      contactPerson: {
        id: validInput.contactPerson.id.toString(),
        note: validInput.contactPerson.note,
        freeFieldOne: validInput.contactPerson.freeFieldOne,
        freeField: {
          id: validInput.contactPerson.freeField.id.toString(),
          name: validInput.contactPerson.freeField.name,
        },
      },
    })
  })

  it('should throw error if clientId is missing', () => {
    const invalidInput = { ...validInput, clientId: '' }
    expect(() => new Person(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('should throw error if communicationAddress is missing', () => {
    const invalidInput = { ...validInput, communicationAddress: null }
    expect(() => new Person(invalidInput as any)).toThrow(EntityBadDataLoadException)
  })

  it('should throw error if contactPerson is missing', () => {
    const invalidInput = { ...validInput, contactPerson: null }
    expect(() => new Person(invalidInput as any)).toThrow(EntityBadDataLoadException)
  })
})
