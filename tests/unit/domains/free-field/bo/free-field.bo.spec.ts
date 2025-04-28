import { FreeField } from '@/domain/client/person/contact-person/free-field/business-objects/free-field.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('FreeField BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Campo Livre',
  }

  it('should create a valid FreeField instance', () => {
    const freeField = new FreeField(validObject)
    expect(freeField).toBeInstanceOf(FreeField)
    expect(freeField.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const freeField = new FreeField(validObject)
    const output = freeField.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new FreeField(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
