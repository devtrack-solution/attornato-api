import { PracticeArea } from '@/domain/practice-area/business-objects/practice-area.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('PracticeArea BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Direito Civil',
  }

  it('should create a valid PracticeArea instance', () => {
    const area = new PracticeArea(validObject)
    expect(area).toBeInstanceOf(PracticeArea)
    expect(area.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const area = new PracticeArea(validObject)
    const output = area.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new PracticeArea(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
