import { County } from '@/domain/process/county/business-objects/county.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('County BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Dianópolis',
  }

  it('should create a valid County without id', () => {
    const county = new County(validObject)
    expect(county).toBeInstanceOf(County)
    expect(county.name).toBe('Dianópolis')
  })

  it('should serialize to persistence object', () => {
    const county = new County(validObject)
    const output = county.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new County(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
