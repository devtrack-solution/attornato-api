import { Legal } from '@/domain/legal/business-objects/legal.bo'
import { Person } from '@/domain/legal/business-objects/person.bo'
import { GroupCustomer } from '@/domain/group-customer/business-objects/group-customer.bo'
import { Profile } from '@/domain/profile/business-objects/profile.bo'
import { CommunicationAddress } from '@/domain/communication-address/business-objects/communication-address.bo'
import { ContactPerson } from '@/domain/legal/contact-person-legal/business-objects/contact-person-legal.bo'
import { FreeField } from '@/domain/free-field/business-objects/free-field.bo'

describe('Legal Business Object - CRUD', () => {
  const baseInput = {
    id: '15189531-e57b-4008-ae60-edb2da503e62',
    clientId: 'PF123456',
    communicationAddress: new CommunicationAddress({
      id: '15189531-e57b-4008-ae60-edb2da503e44',
      zipCode: '12345678',
      street: 'Main Street',
      neighborhood: 'Centro',
      city: 'Highland',
      state: 'SP',
      contacts: [],
    }),
    contactPerson: new ContactPerson({
      id: '15189531-e57b-4008-ae60-edb2da503e43',
      freeFieldOne: 'Test',
      note: 'Some note',
      freeField: new FreeField({ name: 'Field' }),
    }),
    groupCustomer: new GroupCustomer({ id: '15189531-e57b-4008-ae60-edb2da313e62', name: 'Grupo Teste' }),
    profile: new Profile({ id: '15189531-e57b-4008-ae60-edb2da553e62', name: 'Admin' }),
    responsible: 'Carlos',
    companyName: 'Empresa XYZ',
    tradeName: 'XYZ LTDA',
    businessArea: 'Tecnologia',
    cnpj: '12.345.678/0001-99',
    stateRegistration: '123456789',
    municipalRegistration: '987654321',
  }

  it('Create - should instantiate Legal BO successfully', () => {
    const legal = new Legal({ ...baseInput, person: new Person(baseInput) })
    expect(legal).toBeInstanceOf(Legal)
    expect(legal.companyName).toBe('Empresa XYZ')
  })

  it('Read - should serialize to persistence object correctly', () => {
    const legal = new Legal({ ...baseInput, person: new Person(baseInput) })
    const output = legal.toPersistenceObject()

    expect(output).toMatchObject({
      companyName: baseInput.companyName,
      tradeName: baseInput.tradeName,
      responsible: baseInput.responsible,
      person: expect.objectContaining({
        clientId: baseInput.clientId,
      }),
    })
  })

  it('Update - should allow updating company name and re-validating', () => {
    const legal = new Legal({ ...baseInput, person: new Person(baseInput) })
    const updatedName = 'Empresa Atualizada'
    ;(legal as any)._companyName = updatedName

    legal.validate()

    expect(legal.companyName).toBe(updatedName)
  })

  it('Delete - should simulate deletion by nullifying fields', () => {
    const legal = new Legal({ ...baseInput, person: new Person(baseInput) })
    ;(legal as any)._companyName = ''
    expect(() => legal.validate()).toThrow()
  })

  it('should throw error when required fields are missing', () => {
    const invalidInput = { ...baseInput, companyName: '' }
    expect(() => new Legal({ ...invalidInput, person: new Person(baseInput) })).toThrow()
  })
})
