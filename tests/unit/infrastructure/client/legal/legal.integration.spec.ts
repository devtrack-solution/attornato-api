import { DataSource } from 'typeorm'
import { Legal } from '@/domain/client/legal/business-objects/legal.bo'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'
import { ContactPersonBaseEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person-base.entity'
import { ContactEntity } from '@/infrastructure/adapters/pgsql/entities/contact.entity'
import { CommunicationChannelEntity } from '@/infrastructure/adapters/pgsql/entities/communication-channel.entity'
import { FreeFieldEntity } from '@/infrastructure/adapters/pgsql/entities/free-field.entity'
import { LegalTestBuilder } from '@tests/unit/application/services/client/legal/legal-test.builder'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
dotenv.config()

describe('LegalEntity Integration Test', () => {
  let dataSource: DataSource
  let legalId: string

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC === 'true',
      entities: [
        ContactPersonBaseEntity,
        PersonEntity,
        LegalEntity,
        GroupCustomerEntity,
        ProfileEntity,
        CommunicationAddressEntity,
        ContactEntity,
        CommunicationChannelEntity,
        FreeFieldEntity,
      ],
    })

    await dataSource.initialize()

    const COMMUNICATION_CHANNEL_ID = '4000e510-c8b6-47c9-814e-f5aa1b7035bc'

    await dataSource.getRepository(CommunicationChannelEntity).save({
      id: COMMUNICATION_CHANNEL_ID,
      name: 'Telefone',
    })
  })

  afterAll(async () => {
    // Clean up only the LegalEntity created
    if (legalId) {
      await dataSource.getRepository(LegalEntity).delete(legalId)
    }
    await dataSource.destroy()
  })

  it('should persist Legal and related entities in the database', async () => {
    const input = LegalTestBuilder.getSuccess('4000e510-c8b6-47c9-814e-f5aa1b7035bc')
    const legal = new Legal(input)

    const repo = dataSource.getRepository(LegalEntity)

    const entity = repo.create(legal.toPersistenceObject())
    await repo.save(entity)

    legalId = entity.id // Store ID for cleanup

    const saved = await repo.findOne({
      where: { cnpj: input.cnpj },
      relations: ['groupCustomer', 'profile', 'person'],
    })

    expect(saved).toBeDefined()
    expect(saved?.companyName).toBe(input.companyName)
    expect(saved?.cnpj).toBe(input.cnpj)
    expect(saved?.profile.name).toBe(input.profile.name)
    expect(saved?.groupCustomer.name).toBe(input.groupCustomer.name)
  })
})
