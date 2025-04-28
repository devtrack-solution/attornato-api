import { Legal } from '@/domain/client/legal/business-objects/legal.bo'
import { GroupCustomer } from '@/domain/group-customer/business-objects/group-customer.bo'
import { Profile } from '@/domain/profile/business-objects/profile.bo'
import { CommunicationAddress } from '@/domain/communication-address/business-objects/communication-address.bo'
import { FreeField } from '@/domain/free-field/business-objects/free-field.bo'
import { v4 as uuidv4 } from 'uuid'
import { ContactPerson } from '@/domain/client/person/contact-person/business-objects/contact-person.bo'
import { Person } from '@/domain/client/person/business-objects/person.bo'

describe('Legal Business Object - CRUD', () => {
  const baseInput = {
    id: uuidv4(),
    clientId: 'PF123456',
    communicationAddress: new CommunicationAddress({
      id: uuidv4(),
      zipCode: '12345678',
      street: 'Main Street',
      neighborhood: 'Centro',
      city: 'Highland',
      state: 'SP',
      contacts: [
        {
          id: uuidv4(),
          value: '(63) 99200-1122',
          communicationChannel: {
            id: uuidv4(),
            name: 'Telefone',
          },
        },
      ],
    }),
    contactPersonLegal: new ContactPerson({
      id: uuidv4(),
      freeFieldOne: 'Test',
      note: 'Some note',
      freeField: new FreeField({ id: uuidv4(), name: 'Field' }),
    }),
    groupCustomer: new GroupCustomer({ id: uuidv4(), name: 'Grupo Teste' }),
    profile: new Profile({ id: uuidv4(), name: 'Admin' }),
    responsible: 'Carlos',
    companyName: 'Empresa XYZ',
    tradeName: 'XYZ LTDA',
    businessArea: 'Tecnologia',
    cnpj: '12.345.678/0001-99',
    stateRegistration: '123456789',
    municipalRegistration: '987654321',
  }

  it('Create - should instantiate Legal BO successfully', () => {
    const legal = new Legal({
      ...baseInput,
      person: new Person({
        clientId: baseInput.clientId,
        contactPerson: baseInput.contactPersonLegal,
        communicationAddress: baseInput.communicationAddress,
      }),
    })
    expect(legal).toBeInstanceOf(Legal)
    expect(legal.companyName).toBe('Empresa XYZ')
  })

  it('Read - should serialize to persistence object correctly', () => {
    const legal = new Legal({
      ...baseInput,
      person: new Person({
        clientId: baseInput.clientId,
        contactPerson: baseInput.contactPersonLegal,
        communicationAddress: baseInput.communicationAddress,
      }),
    })
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
    const legal = new Legal({
      ...baseInput,
      person: new Person({
        clientId: baseInput.clientId,
        contactPerson: baseInput.contactPersonLegal,
        communicationAddress: baseInput.communicationAddress,
      }),
    })
    const updatedName = 'Empresa Atualizada'
    ;(legal as any)._companyName = updatedName

    legal.validate()

    expect(legal.companyName).toBe(updatedName)
  })

  it('Delete - should simulate deletion by nullifying fields', () => {
    const legal = new Legal({
      ...baseInput,
      person: new Person({
        clientId: baseInput.clientId,
        contactPerson: baseInput.contactPersonLegal,
        communicationAddress: baseInput.communicationAddress,
      }),
    })
    ;(legal as any)._companyName = ''
    expect(() => legal.validate()).toThrow()
  })

  it('should throw error when required fields are missing', () => {
    const invalidInput = { ...baseInput, companyName: '' }
    expect(
      () =>
        new Legal({
          ...invalidInput,
          person: new Person({
            clientId: baseInput.clientId,
            contactPerson: baseInput.contactPersonLegal,
            communicationAddress: baseInput.communicationAddress,
          }),
        }),
    ).toThrow()
  })
})
