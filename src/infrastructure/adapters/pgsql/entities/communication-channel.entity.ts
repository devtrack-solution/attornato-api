import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { ContactEntity } from '@/infrastructure/adapters/pgsql/entities/contact.entity'

@Entity('communication_channel')
export class CommunicationChannelEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => ContactEntity, (contact) => contact.communicationChannel)
  contacts!: ContactEntity[]
}
