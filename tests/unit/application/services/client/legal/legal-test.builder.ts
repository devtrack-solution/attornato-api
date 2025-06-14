import { LegalType } from '@/domain/client/component/legal/types/legal.type'
import { v4 as uuidv4 } from 'uuid'

export class LegalTestBuilder {
  private readonly legal: LegalType.Input

  private constructor() {
    this.legal = {
      id: uuidv4(),
      person: {
        id: uuidv4(),
        clientId: 'PF123456',
        communicationAddress: {
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
        },
        contactPerson: {
          id: uuidv4(),
          freeFieldOne: 'Test',
          note: 'Some note',
          freeField: {
            id: uuidv4(),
            name: 'Field',
          },
        },
      },
      groupCustomer: {
        id: uuidv4(),
        name: 'Grupo Teste',
      },
      profile: {
        id: uuidv4(),
        name: 'Admin',
      },
      responsible: 'Carlos',
      companyName: 'Empresa XYZ',
      tradeName: 'XYZ LTDA',
      businessArea: 'Tecnologia',
      cnpj: '12.345.678/0001-99',
      stateRegistration: '123456789',
      municipalRegistration: '987654321',
    }
  }

  static create(): LegalTestBuilder {
    return new LegalTestBuilder()
  }

  static getSuccess(communicationChannelId: string, groupCustomerId: string, profileId: string, freeFieldId: string): LegalType.Input {
    const builder = new LegalTestBuilder()

    builder.legal.person.communicationAddress.contacts[0].communicationChannel = { id: communicationChannelId }
    builder.legal.groupCustomer = { id: groupCustomerId }
    builder.legal.profile = { id: profileId }
    builder.legal.person.contactPerson.freeField = { id: freeFieldId }

    return builder.build()
  }

  withCnpj(cnpj: string): this {
    this.legal.cnpj = cnpj
    return this
  }

  build(): LegalType.Input {
    return this.legal
  }
}
