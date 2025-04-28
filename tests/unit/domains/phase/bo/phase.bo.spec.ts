import { Phase } from '@/domain/process/phase/business-objects/phase.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Phase BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Fase Inicial',
  }

  it('should create a valid Phase instance', () => {
    const phase = new Phase(validObject)
    expect(phase).toBeInstanceOf(Phase)
    expect(phase.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const phase = new Phase(validObject)
    const output = phase.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Phase(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
