import { ActionObject } from '@/domain/action-object/business-objects/action-object.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('ActionObject BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Criar',
  }

  it('should create a valid ActionObject without id', () => {
    const actionObject = new ActionObject(validObject)
    expect(actionObject).toBeInstanceOf(ActionObject)
    expect(actionObject.name).toBe('Criar')
  })

  it('should serialize to persistence object', () => {
    const actionObject = new ActionObject(validObject)
    const output = actionObject.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new ActionObject(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
