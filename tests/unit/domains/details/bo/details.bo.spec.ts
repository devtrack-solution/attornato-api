import { Detail } from '@/domain/process/component/detail/business-objects/detail.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Detail BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Informações adicionais',
  }

  it('should create a valid Detail without id', () => {
    const detail = new Detail(validObject)
    expect(detail).toBeInstanceOf(Detail)
    expect(detail.name).toBe('Informações adicionais')
  })

  it('should serialize to persistence object', () => {
    const detail = new Detail(validObject)
    const output = detail.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Detail(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
