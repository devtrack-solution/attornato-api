import { Details } from '@/domain/process/details/business-objects/details.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Details BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Informações adicionais',
  }

  it('should create a valid Details without id', () => {
    const details = new Details(validObject)
    expect(details).toBeInstanceOf(Details)
    expect(details.name).toBe('Informações adicionais')
  })

  it('should serialize to persistence object', () => {
    const details = new Details(validObject)
    const output = details.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Details(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
