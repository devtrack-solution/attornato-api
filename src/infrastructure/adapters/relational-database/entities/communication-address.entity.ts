import { Entity, Column, OneToMany, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { ContactEntity } from '@/infrastructure/adapters/relational-database/entities/contact.entity'
import { PersonEntity } from '@/infrastructure/adapters/relational-database/entities/person.entity'

@Entity('communication_address')
export class CommunicationAddressEntity extends EntityBase {
  @Column({ type: 'varchar', length: 9 })
  zipCode!: string

  @Column({ type: 'varchar', length: 255 })
  street!: string

  @Column({ type: 'varchar', length: 255 })
  neighborhood!: string

  @Column({ type: 'varchar', length: 255 })
  city!: string

  @Column({ type: 'varchar', length: 255 })
  state!: string

  @OneToMany(() => ContactEntity, (contact) => contact.communicationAddress, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  contacts!: ContactEntity[]

  @OneToOne(() => PersonEntity, (person) => person.communicationAddress)
  person?: PersonEntity
}
