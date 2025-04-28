import { LocalProcedureName } from '@/domain/process/local-procedure-name/business-objects/local-procedure-name.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('LocalProcedureName BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Consulta Inicial',
  }

  it('should create a valid LocalProcedureName without id', () => {
    const item = new LocalProcedureName(validObject)
    expect(item).toBeInstanceOf(LocalProcedureName)
    expect(item.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const item = new LocalProcedureName(validObject)
    const output = item.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new LocalProcedureName(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
