import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import {CommunicationChannelEntity} from "@/infrastructure/adapters/pgsql/entities/communication-channel.entity";
import {CommunicationAddressEntity} from "@/infrastructure/adapters/pgsql/entities/communication-address.entity";

@Entity('contact')
export class ContactEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 17 })
  value!: string

  @ManyToOne(() => CommunicationChannelEntity, (communicationChannel) => communicationChannel.contacts)
  @JoinColumn({ name: 'communicationChannelId', referencedColumnName: 'id' })
  communicationChannel!: CommunicationChannelEntity

  @OneToMany(() => CommunicationAddressEntity, (communicationAddress) => communicationAddress.contacts, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  communicationAddress!: CommunicationAddressEntity
}
