import { Locator } from '@/domain/locator/business-objects/locator.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Locator BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Hospital Central',
  }

  it('should create a valid Locator without id', () => {
    const locator = new Locator(validObject)
    expect(locator).toBeInstanceOf(Locator)
    expect(locator.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const locator = new Locator(validObject)
    const output = locator.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Locator(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
