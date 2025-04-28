import { Responsible } from '@/domain/process/responsible/business-objects/responsible.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Responsible BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Fulano de Tal',
  }

  it('should create a valid Responsible without id', () => {
    const responsible = new Responsible(validObject)
    expect(responsible).toBeInstanceOf(Responsible)
    expect(responsible.name).toBe('Fulano de Tal')
  })

  it('should serialize to persistence object', () => {
    const responsible = new Responsible(validObject)
    const output = responsible.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Responsible(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
