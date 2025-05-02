import { Profile } from '@/domain/client/component/profile/business-objects/profile.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('Profile BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Administrador',
  }

  it('should create a valid Profile instance', () => {
    const profile = new Profile(validObject)
    expect(profile).toBeInstanceOf(Profile)
    expect(profile.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const profile = new Profile(validObject)
    const output = profile.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new Profile(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
