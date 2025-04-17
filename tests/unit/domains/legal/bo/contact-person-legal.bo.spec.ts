import { ContactPersonLegal } from '@/domain/legal/contact-person-legal/business-objects/contact-person-legal.bo'
import { FreeField } from '@/domain/free-field/business-objects/free-field.bo'
import { v4 as uuidv4 } from 'uuid'

describe('ContactPersonLegal BO', () => {
  const mockFreeField = new FreeField({
    id: uuidv4(),
    name: 'Telefone comercial',
  })

  const mockInput = {
    id: uuidv4(),
    freeFieldOne: 'Contato preferencial',
    note: 'Cliente prefere ligação entre 13h e 17h',
    freeField: mockFreeField,
  }

  it('should instantiate ContactPersonLegal with valid data', () => {
    const person = new ContactPersonLegal(mockInput)

    expect(person).toBeInstanceOf(ContactPersonLegal)
    expect(person.freeFieldOne).toBe(mockInput.freeFieldOne)
    expect(person.note).toBe(mockInput.note)
    expect(person.freeField.name).toBe(mockFreeField.name)
  })

  it('should serialize to persistence object', () => {
    const person = new ContactPersonLegal(mockInput)
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

    expect(() => new ContactPersonLegal(invalidInput as any)).toThrowError('Error loading ContactPersonLegal entity')
  })

  it('should throw validation error when freeFieldOne is empty', () => {
    const invalidInput = {
      ...mockInput,
      freeFieldOne: '',
    }

    expect(() => new ContactPersonLegal(invalidInput)).toThrowError('Failed to validate ContactPersonLegal rules')
  })

  it('should throw validation error when note is empty', () => {
    const invalidInput = {
      ...mockInput,
      note: '',
    }

    expect(() => new ContactPersonLegal(invalidInput)).toThrowError('Failed to validate ContactPersonLegal rules')
  })
})
