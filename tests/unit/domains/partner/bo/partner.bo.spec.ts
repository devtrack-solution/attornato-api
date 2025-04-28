import { Partner } from '@/domain/process/partner/business-objects/partner.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Partner BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Parceiro X',
  }

  it('should create a valid Partner instance', () => {
    const partner = new Partner(validObject)
    expect(partner).toBeInstanceOf(Partner)
    expect(partner.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const partner = new Partner(validObject)
    const output = partner.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Partner(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
