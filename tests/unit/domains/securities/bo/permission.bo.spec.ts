// tests/unit/domains/auth/bo/permission.bo.spec.ts
import { Permission } from '@/domain/securities/business-objects/permission.bo'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { EntityBadDataLoadException, EntityInvalidFormatException } from '@/core/domain/exceptions'

describe('Permission', () => {
  const validInput: PermissionType.Input = {
    name: 'TestPermission',
    description: 'This is a test permission',
    resource: 'test_resource',
  }

  it('should load data correctly', () => {
    const permission = new Permission(validInput)
    expect(permission.toPersistenceObject()).toEqual(validInput)
  })

  it('should throw an error if data is invalid', () => {
    const invalidInput: any = {
      name: null,
      description: 'This is a test permission',
    }

    expect(() => new Permission(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('should validate data correctly', () => {
    const permission = new Permission(validInput)
    expect(() => permission.validate()).not.toThrow()
  })

  it('should return the correct persistence object', () => {
    const permission = new Permission(validInput)
    const persistenceObject = permission.toPersistenceObject()
    expect(persistenceObject).toEqual(validInput)
  })

  it('should throw an error if data is invalid', () => {
    const invalidInput: any = {
      name: null,
      description: 'This is a test permission',
    }

    expect(() => new Permission(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('should validate data correctly', () => {
    const permission = new Permission(validInput)
    expect(() => permission.validate()).not.toThrow()
  })

  it('should return the correct persistence object', () => {
    const permission = new Permission(validInput)
    const persistenceObject = permission.toPersistenceObject()
    expect(persistenceObject).toEqual(validInput)
  })

  it('should throw an error if name contains whitespace', () => {
    const invalidInput: PermissionType.Input = {
      ...validInput,
      name: 'Invalid Name', // Nome com espaço
    }
    expect(() => new Permission(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('should throw an error if name exceeds 50 characters', () => {
    const invalidInput: PermissionType.Input = {
      ...validInput,
      name: 'A'.repeat(51), // Nome muito longo
    }
    expect(() => new Permission(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('should throw an error if description exceeds 100 characters', () => {
    const invalidInput: PermissionType.Input = {
      ...validInput,
      description: 'A'.repeat(101), // Descrição muito longa
    }
    expect(() => new Permission(invalidInput)).toThrow(EntityInvalidFormatException)
  })
})
