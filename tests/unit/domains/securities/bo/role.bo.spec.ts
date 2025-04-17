import { Role } from '@/domain/securities/business-objects/role.bo'
import { RoleType } from '@/domain/securities/types/role.type'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'

describe('Role Business Object', () => {
  let validRoleData: RoleType.Input

  beforeEach(() => {
    validRoleData = {
      name: 'ValidName',
      description: 'Valid description',
      permissions: [],
      level: 0,
    }
  })

  it('nome deve ser obrigatório', () => {
    validRoleData.name = ''
    expect(() => new Role(validRoleData)).toThrow(EntityInvalidFormatException)
  })

  it('descrição deve ser obrigatória', () => {
    validRoleData.description = null
    expect(() => new Role(validRoleData)).toThrow(EntityInvalidFormatException)
  })

  it('permissões podem ser vazio', () => {
    validRoleData.permissions = []
    expect(() => new Role(validRoleData)).not.toThrow()
  })

  it('nomes não deve conter espaços', () => {
    validRoleData.name = 'Invalid Name'
    expect(() => new Role(validRoleData)).toThrow(EntityInvalidFormatException)
  })

  it('level é maior que zero', () => {
    validRoleData.level = -1
    expect(() => new Role(validRoleData)).toThrow(EntityInvalidFormatException)
  })

  it('descrição não deve ter mais que 100 caracteres', () => {
    validRoleData.description = 'a'.repeat(101)
    expect(() => new Role(validRoleData)).toThrow(EntityInvalidFormatException)
  })

  it('nome não pode ter mais que 50 caracteres', () => {
    validRoleData.name = 'a'.repeat(51)
    expect(() => new Role(validRoleData)).toThrow(EntityInvalidFormatException)
  })
})
