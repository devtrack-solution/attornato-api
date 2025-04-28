import { ProceduralStatus } from '@/domain/process/procedural-status/business-objects/procedural-status.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('ProceduralStatus BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Em andamento',
  }

  it('should create a valid ProceduralStatus instance', () => {
    const status = new ProceduralStatus(validObject)
    expect(status).toBeInstanceOf(ProceduralStatus)
    expect(status.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const status = new ProceduralStatus(validObject)
    const output = status.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new ProceduralStatus(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
