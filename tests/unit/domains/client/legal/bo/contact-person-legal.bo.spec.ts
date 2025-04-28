import { FreeField } from '@/domain/client/person/contact-person/free-field/business-objects/free-field.bo'
import { v4 as uuidv4 } from 'uuid'
import { ContactPerson } from '@/domain/client/person/contact-person/business-objects/contact-person.bo'

describe('ContactPerson BO', () => {
  const mockFreeField = new FreeField({
    id: uuidv4(),
  })

  const mockInput = {
    id: uuidv4(),
    freeFieldOne: 'Contato preferencial',
    note: 'Cliente prefere ligação entre 13h e 17h',
    mobilePhone: undefined,
    phoneNumber: undefined,
    fatherName: undefined,
    motherName: undefined,
    freeField: mockFreeField,
  }

  it('should instantiate ContactPerson with valid data', () => {
    const person = new ContactPerson(mockInput)

    expect(person).toBeInstanceOf(ContactPerson)
    expect(person.freeFieldOne).toBe(mockInput.freeFieldOne)
    expect(person.note).toBe(mockInput.note)
    expect(person.freeField.name).toBe(mockFreeField.name)
  })

  it('should serialize to persistence object', () => {
    const person = new ContactPerson(mockInput)
    const output = person.toPersistenceObject()

    expect(output).toEqual({
      id: mockInput.id.toString(),
      freeFieldOne: 'Contato preferencial',
      note: 'Cliente prefere ligação entre 13h e 17h',
      freeField: {
        id: mockFreeField.id.toString(),
        name: 'Telefone comercial',
      },
    })
  })

  it('should throw validation error when freeField is null', () => {
    const invalidInput = {
      ...mockInput,
      freeField: null,
    }

    expect(() => new ContactPerson(invalidInput as any)).toThrowError('Error loading ContactPerson entity')
  })

  it('should throw validation error when freeFieldOne is empty', () => {
    const invalidInput = {
      ...mockInput,
      freeFieldOne: '',
    }

    expect(() => new ContactPerson(invalidInput)).toThrowError('Failed to validate ContactPerson rules')
  })

  it('should throw validation error when note is empty', () => {
    const invalidInput = {
      ...mockInput,
      note: '',
    }

    expect(() => new ContactPerson(invalidInput)).toThrowError('Failed to validate ContactPerson rules')
  })
})
