import { Credential } from '@/domain/securities/business-objects/credential.bo'
import { Role } from '@/domain/securities/business-objects/role.bo'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { EntityBadDataLoadException, EntityInvalidFormatException } from '@/core/domain/exceptions'
import { PermissionType } from '@/domain/securities/types/permission.type'
import { PermissionConstants } from '@/commons/securities/permission.constants'
import { v4 as uuidv4 } from 'uuid'

describe('Credential', () => {
  const mockInput: CredentialType.Input = {
    username: 'validUser',
    password: 's@ecurePass123',
    lastLogin: new Date('2024-01-01T00:00:00Z'),
    expiredAt: new Date('2024-12-31T23:59:59Z'),
    resetPasswordToken: 'asddfasdf',
    resetPasswordCode: 'asdfasd',
    requestNewPassword: true,
    roles: [
      {
        id: uuidv4(),
        name: 'admin',
        description: 'Administrator role',
        level: 1,
        permissions: [],
      }!,
    ],
  }

  it('should create a valid Credential object', () => {
    const credential = new Credential(mockInput)

    expect(credential.username).toBe(mockInput.username)
    expect(credential.passwordHash).toBeDefined()

    expect(credential.resetPasswordToken).toBe(mockInput.resetPasswordToken)
    expect(credential.resetPasswordCode).toBe(mockInput.resetPasswordCode)
    expect(credential.roles.length).toBe(1)
    expect(credential.roles[0]).toBeInstanceOf(Role)
  })

  it('should serialize to persistence object', () => {
    const credential = new Credential(mockInput)
    const output = credential.toPersistenceObject()

    expect(output).toEqual({
      id: credential.id,
      username: mockInput.username,
      passwordHash: credential.passwordHash,
      lastLogin: mockInput.lastLogin,
      expiredAt: mockInput.expiredAt,
      resetPasswordToken: mockInput.resetPasswordToken,
      resetPasswordCode: mockInput.resetPasswordCode,
    })
  })

  it('should validate with success', () => {
    expect(() => new Credential(mockInput)).not.toThrow()
  })

  it('should throw validation error if username is missing', () => {
    const invalidInput = { ...mockInput, username: '' }
    expect(() => new Credential(invalidInput)).toThrowError(EntityInvalidFormatException)
  })

  it('should throw EntityBadDataLoadException if role data is invalid', () => {
    const brokenInput = { ...mockInput, roles: [{} as any] }

    expect(() => new Credential(brokenInput)).toThrow(EntityBadDataLoadException)
  })

  it('should return null for optional fields when not provided', () => {
    const partialInput: CredentialType.Input = {
      username: 'noOptionals',
      password: '@Aabc123',
      requestNewPassword: false
    }

    const credential = new Credential(partialInput)
    expect(credential.lastLogin).toBeNull()
    expect(credential.expiredAt).toBeNull()
    expect(credential.resetPasswordCode).toBeNull()
    expect(credential.resetPasswordToken).toBeNull()
    expect(credential.roles).toEqual([])
  })

  it('deve lançar erro se lastLogin for inválido', () => {
    const invalidInput = { ...mockInput, lastLogin: 'invalid-date' }
    expect(() => new Credential(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('deve lançar erro se expiredAt for inválido', () => {
    const invalidInput = { ...mockInput, expiredAt: 'invalid-date' }
    expect(() => new Credential(invalidInput)).toThrow(EntityInvalidFormatException)
  })

  it('deve validar corretamente múltiplos roles', () => {
    const multipleRolesInput = {
      ...mockInput,
      roles: [
        { id: 'e8b9cc77-b36e-4230-a439-3028dccad864', name: 'admin', description: 'Admin role', level: 1, permissions: [] },
        { id: '0023a223-07df-48ee-b43a-2146efc44ef7', name: 'user', description: 'User role', level: 2, permissions: [] },
      ],
    }
    const credential = new Credential(multipleRolesInput)
    expect(credential.roles.length).toBe(2)
    expect(credential.roles[0]).toBeInstanceOf(Role)
    expect(credential.roles[1]).toBeInstanceOf(Role)
  })

  it('deve retornar dados corretos de toPersistenceRole', () => {
    const credentialWithRoles = new Credential(mockInput);
    const persistenceRolesWithRoles = credentialWithRoles.toPersistenceRole();

    // Cenário 1: Roles definidos
    expect(persistenceRolesWithRoles).toEqual([
      {
        credentialId: credentialWithRoles.id,
        roleId: mockInput?.roles[0].id,
      },
    ]);

    // Cenário 2: Roles indefinidos
    const inputWithoutRoles = { ...mockInput, roles: undefined };
    const credentialWithoutRoles = new Credential(inputWithoutRoles);
    const persistenceRolesWithoutRoles = credentialWithoutRoles.toPersistenceRole();

    expect(persistenceRolesWithoutRoles).toEqual([]);
  });

  it('deve lançar erro se senha for muito longa', () => {
    const invalidInput = { ...mockInput, password: 'A'.repeat(101) }
    expect(() => new Credential(invalidInput)).toThrow(EntityBadDataLoadException)
  })

  it('deve lançar erro se senha for muito curta', () => {
    const invalidInput = { ...mockInput, password: 'A1!' }
    expect(() => new Credential(invalidInput)).toThrow(EntityBadDataLoadException)
  })

  it('deve configurar requestNewPassword como true quando indefinido', () => {
    const inputWithoutRequestNewPassword = { ...mockInput, requestNewPassword: undefined }
    const credential = new Credential(inputWithoutRequestNewPassword)

    expect(credential.requestNewPassword).toBe(true)
  })

  it('deve manter requestNewPassword como false quando explicitamente definido', () => {
    const inputWithRequestNewPasswordFalse = { ...mockInput, requestNewPassword: false }
    const credential = new Credential(inputWithRequestNewPasswordFalse)

    expect(credential.requestNewPassword).toBe(false)
  })

  it('deve criar credencial com requestNewPassword como false sem lançar exceções', () => {
    const inputWithRequestNewPasswordFalse = { ...mockInput, requestNewPassword: false }

    expect(() => new Credential(inputWithRequestNewPasswordFalse)).not.toThrow()
  })

  it('deve retornar apenas uma permissão com o nome "UDPATE_PASSWORD" quando requestNewPassword for true', () => {
    const inputWithRequestNewPasswordTrue = {
      ...mockInput,
      requestNewPassword: true,
      roles: [
        {
          id: 'b6811337-79b4-44c7-8b87-e4e8218659a6',
          name: 'admin',
          description: 'Administrator role',
          level: 1,
          permissions: [
            { name: 'READ', description: 'Read permission', resource: 'resource-1' },
            { name: PermissionConstants.PERMISSION_UPDATE_PASSWORD, description: 'Update password permission', resource: 'resource-2' },
          ],
        },
      ],
    }

    const credential = new Credential(inputWithRequestNewPasswordTrue)

    const permissions = credential.toJson().roles?.flatMap((role: { permissions: PermissionType.Output }) => role.permissions)

    expect(permissions).toHaveLength(1)
    expect(permissions[0]?.name).toBe(PermissionConstants.PERMISSION_UPDATE_PASSWORD)
  })
})
