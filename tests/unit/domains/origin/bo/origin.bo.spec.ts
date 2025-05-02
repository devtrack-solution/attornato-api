import { Origin } from '@/domain/process/component/origin/business-objects/origin.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Origin BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Origem A',
  }

  it('should create a valid Origin instance', () => {
    const origin = new Origin(validObject)
    expect(origin).toBeInstanceOf(Origin)
    expect(origin.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const origin = new Origin(validObject)
    const output = origin.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Origin(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
