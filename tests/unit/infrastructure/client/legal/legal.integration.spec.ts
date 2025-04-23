import { DataSource } from 'typeorm'
import { Legal } from '@/domain/client/legal/business-objects/legal.bo'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'
import { ContactPersonEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person.entity'
import { ContactEntity } from '@/infrastructure/adapters/pgsql/entities/contact.entity'
import { CommunicationChannelEntity } from '@/infrastructure/adapters/pgsql/entities/communication-channel.entity'
import { FreeFieldEntity } from '@/infrastructure/adapters/pgsql/entities/free-field.entity'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import { LegalTestBuilder } from '@tests/unit/application/services/client/legal/legal-test.builder'
import { LegalRepository } from '@/infrastructure/adapters/pgsql/repositories/legal.repository'
import { ContactRepository } from '@/infrastructure/adapters/pgsql/repositories/contact.repository'
import { GroupCustomerRepository } from '@/infrastructure/adapters/pgsql/repositories/group-customer.repository'
import { ProfileRepository } from '@/infrastructure/adapters/pgsql/repositories/profile.repository'
import { FreeFieldRepository } from '@/infrastructure/adapters/pgsql/repositories/free-field.repository'
import { CommunicationChannelRepository } from '@/infrastructure/adapters/pgsql/repositories/communication-channel.repository'
import { PersonRepository } from '@/infrastructure/adapters/pgsql/repositories/person.repository'
import { CommunicationAddressRepository } from '@/infrastructure/adapters/pgsql/repositories/communication-address.repository'
import { ContactPersonRepository } from '@/infrastructure/adapters/pgsql/repositories/contact-person-repository'

dotenv.config()

describe('LegalEntity Integration Test', () => {
  let dataSource: DataSource
  let legalId: string | undefined
  let personId: string | undefined
  let contactPersonId: string | undefined
  let addressId: string | undefined
  let contactIds: string[] = []
  let createdIds: string[] = []

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [ContactPersonEntity, PersonEntity, LegalEntity, GroupCustomerEntity, ProfileEntity, CommunicationAddressEntity, ContactEntity, CommunicationChannelEntity, FreeFieldEntity],
    })

    await dataSource.initialize()
  })

  afterAll(async () => {
    const repos = {
      legal: new LegalRepository(dataSource),
      person: new PersonRepository(dataSource),
      contactPersonLegal: new ContactPersonRepository(dataSource),
      address: new CommunicationAddressRepository(dataSource),
      contact: new ContactRepository(dataSource),
      groupCustomer: new GroupCustomerRepository(dataSource),
      profile: new ProfileRepository(dataSource),
      communicationChannel: new CommunicationChannelRepository(dataSource),
      freeField: new FreeFieldRepository(dataSource),
    }

    try {
      // Deleta entidade composta Legal (tem FK para person, profile, groupCustomer etc.)
      if (legalId) await repos.legal.delete(legalId)

      // Deleta contatos individualmente
      for (const contactId of contactIds) {
        await repos.contact.delete(contactId)
      }

      // Deleta entidade de endereço da pessoa
      if (addressId) await repos.address.delete(addressId)

      // Deleta pessoa e informações de contato
      if (contactPersonId) await repos.contactPersonLegal.delete(contactPersonId)
      if (personId) await repos.person.delete(personId)

      // Deleta entidades compartilhadas criadas neste teste
      for (const id of createdIds) {
        await Promise.allSettled([repos.groupCustomer.delete(id), repos.profile.delete(id), repos.communicationChannel.delete(id), repos.freeField.delete(id)])
      }
    } catch (error) {
      console.error('Erro ao limpar dados após o teste:', error)
    } finally {
      await dataSource.destroy()
    }
  })

  it('should persist Legal and related entities in the database', async () => {
    const groupCustomerRepo = dataSource.getRepository(GroupCustomerEntity)
    const profileRepo = dataSource.getRepository(ProfileEntity)
    const communicationChannelRepo = dataSource.getRepository(CommunicationChannelEntity)
    const freeFieldRepo = dataSource.getRepository(FreeFieldEntity)
    const legalRepo = dataSource.getRepository(LegalEntity)

    const groupCustomer = await groupCustomerRepo.save({ id: uuidv4(), name: 'Grupo Teste' })
    const profile = await profileRepo.save({ id: uuidv4(), name: 'Admin Teste' })
    const communicationChannel = await communicationChannelRepo.save({ id: uuidv4(), name: 'Telefone Teste' })
    const freeField = await freeFieldRepo.save({ id: uuidv4(), name: 'Campo Extra' })

    createdIds.push(groupCustomer.id, profile.id, communicationChannel.id, freeField.id)

    const [foundGroupCustomer, foundProfile, foundCommunicationChannel, foundFreeField] = await Promise.all([
      groupCustomerRepo.findOneBy({ id: groupCustomer.id }),
      profileRepo.findOneBy({ id: profile.id }),
      communicationChannelRepo.findOneBy({ id: communicationChannel.id }),
      freeFieldRepo.findOneBy({ id: freeField.id }),
    ])

    expect(foundGroupCustomer).toBeDefined()
    expect(foundProfile).toBeDefined()
    expect(foundCommunicationChannel).toBeDefined()
    expect(foundFreeField).toBeDefined()

    const input = LegalTestBuilder.getSuccess(communicationChannel.id, groupCustomer.id, profile.id, freeField.id)

    const legal = new Legal(input)
    const entity = legalRepo.create(legal.toPersistenceObject())

    await legalRepo.save(entity)
    legalId = entity.id

    const saved = await legalRepo.findOne({
      where: { id: legalId },
      relations: ['groupCustomer', 'profile', 'person'],
    })

    expect(saved).toBeDefined()
    expect(saved?.companyName).toBe(input.companyName)
    expect(saved?.cnpj).toBe(input.cnpj)
    expect(saved?.profile.id).toBe(profile.id)
    expect(saved?.groupCustomer.id).toBe(groupCustomer.id)
  })
})
