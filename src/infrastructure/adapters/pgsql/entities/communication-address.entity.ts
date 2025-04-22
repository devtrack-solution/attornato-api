import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { ContactEntity } from '@/infrastructure/adapters/pgsql/entities/contact.entity'

@Entity('communication_address')
export class CommunicationAddressEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 9 })
  zipCode!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  street!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  neighborhood!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  city!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  state!: string

  @OneToMany(() => ContactEntity, (contact) => contact.communicationAddress, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  contacts!: ContactEntity[]
}
