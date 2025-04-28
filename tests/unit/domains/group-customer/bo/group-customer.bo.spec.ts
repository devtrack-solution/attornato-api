import { GroupCustomer } from '@/domain/client/group-customer/business-objects/group-customer.bo'
import { EntityInvalidFormatException } from '@/core/domain/exceptions'
import { v4 as uuidv4 } from 'uuid'

describe('GroupCustomer BO', () => {
  const validObject = {
    id: uuidv4(),
    name: 'Grupo Cliente',
  }

  it('should create a valid GroupCustomer instance', () => {
    const groupCustomer = new GroupCustomer(validObject)
    expect(groupCustomer).toBeInstanceOf(GroupCustomer)
    expect(groupCustomer.name).toBe(validObject.name)
  })

  it('should serialize to persistence object', () => {
    const groupCustomer = new GroupCustomer(validObject)
    const output = groupCustomer.toPersistenceObject()

    expect(output).toEqual({
      id: validObject.id.toString(),
      name: validObject.name,
    })
  })

  it('should throw error if name is empty', () => {
    const invalidInput = {
      name: '',
    }

    expect(() => new GroupCustomer(invalidInput as any)).toThrow(EntityInvalidFormatException)
  })
})
