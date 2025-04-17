import { GroupProcess } from '@/domain/group-process/business-objects/group-process.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('GroupProcess BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Grupo Processo',
  }

  it('should create a valid GroupProcess instance', () => {
    const groupProcess = new GroupProcess(validObject)
    expect(groupProcess).toBeInstanceOf(GroupProcess)
    expect(groupProcess.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const groupProcess = new GroupProcess(validObject)
    const output = groupProcess.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new GroupProcess(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
