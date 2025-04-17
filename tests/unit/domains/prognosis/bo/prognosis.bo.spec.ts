import { Prognosis } from '@/domain/prognosis/business-objects/prognosis.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Prognosis BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Positiva',
  }

  it('should create a valid Prognosis instance', () => {
    const prognosis = new Prognosis(validObject)
    expect(prognosis).toBeInstanceOf(Prognosis)
    expect(prognosis.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const prognosis = new Prognosis(validObject)
    const output = prognosis.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Prognosis(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
